'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/cn';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, X, AlertTriangle } from 'lucide-react';

export interface MermaidProps {
  chart?: string;
  children?: string;
  className?: string;
  title?: string;
}

export function Mermaid({ chart: propChart, children, className }: MermaidProps) {
  const chartText = (propChart || (typeof children === 'string' ? children : '')).trim();
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);

  const [rendered, setRendered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');

  // Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Fullscreen modal state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenZoom, setFullscreenZoom] = useState(1);
  const [fullscreenPan, setFullscreenPan] = useState({ x: 0, y: 0 });
  const [isFullscreenDragging, setIsFullscreenDragging] = useState(false);
  const fullscreenDragStartRef = useRef({ x: 0, y: 0 });

  const resetTransform = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = () => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)));
  const handleZoomOut = () => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)));

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (!chartText) return;

    let isMounted = true;

    async function renderMermaid() {
      const id = 'mmd_' + Math.random().toString(36).substring(2, 10);

      try {
        const mermaid = (await import('mermaid')).default;

        const isDark =
          typeof document !== 'undefined' &&
          (document.documentElement.classList.contains('dark') ||
            document.documentElement.getAttribute('data-theme') === 'dark');

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          fontFamily: 'inherit',
          theme: 'base',
          themeVariables: isDark
            ? {
                primaryColor: '#16a34a',
                primaryTextColor: '#ffffff',
                primaryBorderColor: '#22c55e',
                lineColor: '#22c55e',
                secondaryColor: '#14532d',
                tertiaryColor: '#171717',
                background: 'transparent',
                mainBkg: '#14532d',
                nodeBorder: '#22c55e',
                clusterBkg: '#14532d20',
                clusterBorder: '#16a34a',
                titleColor: '#22c55e',
                edgeLabelBackground: '#171717',
                nodeTextColor: '#ffffff',
              }
            : {
                primaryColor: '#16a34a',
                primaryTextColor: '#ffffff',
                primaryBorderColor: '#15803d',
                lineColor: '#16a34a',
                secondaryColor: '#f0fdf4',
                tertiaryColor: '#f9fafb',
                background: 'transparent',
                mainBkg: '#16a34a',
                nodeBorder: '#15803d',
                clusterBkg: '#f0fdf4',
                clusterBorder: '#86efac',
                titleColor: '#15803d',
                edgeLabelBackground: '#ffffff',
                nodeTextColor: '#ffffff',
              },
        });

        const { svg } = await mermaid.render(id, chartText);

        if (isMounted) {
          const cleanSvg = svg.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
          setSvgContent(cleanSvg);
          if (containerRef.current) {
            containerRef.current.innerHTML = cleanSvg;
          }
          setRendered(true);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const danglingError = document.getElementById('d' + id);
          if (danglingError) danglingError.remove();

          console.warn('[Mermaid] render error:', err);
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
        }
      }
    }

    renderMermaid();

    const observer = new MutationObserver(() => {
      renderMermaid();
    });

    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme'],
      });
    }

    return () => {
      isMounted = false;
      observer.disconnect();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [chartText]);

  if (!chartText) return null;

  return (
    <div className={cn('not-prose my-8 w-full group relative select-none', className)}>
      {error ? (
        <div className="flex flex-col items-center gap-2 p-4 text-center text-xs text-rose-500">
          <AlertTriangle className="size-5" />
          <span>Diagram render issue. Showing raw source:</span>
          <pre className="mt-2 text-left bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg font-mono text-[11px] text-neutral-800 dark:text-neutral-200 max-w-full overflow-x-auto">
            {chartText}
          </pre>
        </div>
      ) : (
        <>
          {!rendered && (
            <div className="flex items-center justify-center py-6 text-xs text-neutral-400">
              <div className="size-4 animate-spin rounded-full border-2 border-green-600 border-t-transparent mr-2" />
              Rendering diagram...
            </div>
          )}

          {/* Floating Zoom & Pan Controls (Top Right) */}
          {rendered && (
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-lg border border-neutral-200/80 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 p-1 shadow-2xs backdrop-blur-xs transition-opacity duration-200">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1 rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={resetTransform}
                className="px-1.5 py-0.5 rounded font-mono text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                title="Reset Zoom"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1 rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={resetTransform}
                className="p-1 rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                title="Reset Position"
              >
                <RotateCcw className="size-3.5" />
              </button>
              <div className="h-3.5 w-px bg-neutral-200 dark:bg-white/10 mx-0.5" />
              <button
                type="button"
                onClick={() => {
                  setIsFullscreen(true);
                  setFullscreenZoom(1);
                  setFullscreenPan({ x: 0, y: 0 });
                }}
                className="p-1 rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                title="Expand Fullscreen"
              >
                <Maximize2 className="size-3.5" />
              </button>
            </div>
          )}

          {/* Interactive Zoomable Viewport */}
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={cn(
              'w-full overflow-hidden rounded-xl py-4 flex items-center justify-center transition-cursor',
              isDragging ? 'cursor-grabbing' : 'cursor-grab',
              !rendered && 'hidden',
            )}
          >
            <div
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              }}
              className="w-full max-w-full flex justify-center [&>svg]:w-full [&>svg]:max-w-full [&>svg]:h-auto text-neutral-800 dark:text-neutral-200 pointer-events-none"
              ref={containerRef}
            />
          </div>

          {/* Fullscreen Interactive Modal */}
          {isFullscreen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200">
              <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col rounded-2xl border border-white/10 bg-neutral-950/95 overflow-hidden shadow-2xl">
                {/* Header controls */}
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-neutral-900/50">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-green-500" />
                    <span className="font-mono text-xs font-semibold text-neutral-300">
                      Architecture Pipeline (Zoom & Drag to Explore)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-neutral-900 px-2 py-1">
                      <button
                        type="button"
                        onClick={() => setFullscreenZoom((z) => Math.min(4, +(z + 0.25).toFixed(2)))}
                        className="p-1 rounded text-neutral-300 hover:text-white"
                        title="Zoom In"
                      >
                        <ZoomIn className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFullscreenZoom(1);
                          setFullscreenPan({ x: 0, y: 0 });
                        }}
                        className="px-1.5 py-0.5 font-mono text-[11px] font-bold text-neutral-400 hover:text-white"
                      >
                        {Math.round(fullscreenZoom * 100)}%
                      </button>
                      <button
                        type="button"
                        onClick={() => setFullscreenZoom((z) => Math.max(0.4, +(z - 0.25).toFixed(2)))}
                        className="p-1 rounded text-neutral-300 hover:text-white"
                        title="Zoom Out"
                      >
                        <ZoomOut className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFullscreenZoom(1);
                          setFullscreenPan({ x: 0, y: 0 });
                        }}
                        className="p-1 rounded text-neutral-300 hover:text-white"
                        title="Reset"
                      >
                        <RotateCcw className="size-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFullscreen(false)}
                      className="p-1.5 rounded-lg border border-white/10 bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                      title="Close"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Fullscreen Canvas */}
                <div
                  onMouseDown={(e) => {
                    if (e.button !== 0) return;
                    setIsFullscreenDragging(true);
                    fullscreenDragStartRef.current = {
                      x: e.clientX - fullscreenPan.x,
                      y: e.clientY - fullscreenPan.y,
                    };
                  }}
                  onMouseMove={(e) => {
                    if (!isFullscreenDragging) return;
                    setFullscreenPan({
                      x: e.clientX - fullscreenDragStartRef.current.x,
                      y: e.clientY - fullscreenDragStartRef.current.y,
                    });
                  }}
                  onMouseUp={() => setIsFullscreenDragging(false)}
                  onMouseLeave={() => setIsFullscreenDragging(false)}
                  className={cn(
                    'flex-1 w-full h-full overflow-hidden flex items-center justify-center p-8',
                    isFullscreenDragging ? 'cursor-grabbing' : 'cursor-grab',
                  )}
                >
                  <div
                    style={{
                      transform: `translate(${fullscreenPan.x}px, ${fullscreenPan.y}px) scale(${fullscreenZoom})`,
                      transformOrigin: 'center center',
                      transition: isFullscreenDragging ? 'none' : 'transform 0.15s ease-out',
                    }}
                    className="w-full max-w-full flex justify-center [&>svg]:w-full [&>svg]:max-w-5xl [&>svg]:h-auto text-neutral-200 pointer-events-none"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
