"use client";

import React, { useState, useEffect, useMemo } from "react";

interface MasonryGridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getAspectRatio?: (item: T) => number; // width / height
  gap?: number;
}

export default function MasonryGrid<T extends { id: string | number }>({
  items,
  renderItem,
  getAspectRatio,
  gap = 20,
}: MasonryGridProps<T>) {
  const [colCount, setColCount] = useState<number>(4);

  useEffect(() => {
    const calcCols = () => {
      const width = window.innerWidth;
      if (width < 640) return 1;
      if (width < 960) return 2;
      if (width < 1320) return 3;
      return 4;
    };

    const handleResize = () => {
      setColCount(calcCols());
    };

    const frame = requestAnimationFrame(handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Distribute items across columns, balancing heights for a smooth Pinterest-style masonry layout
  const columns = useMemo(() => {
    const cols: T[][] = Array.from({ length: colCount }, () => []);
    const heights = new Array(colCount).fill(0);

    items.forEach((item) => {
      // Find the column with minimum accumulated height
      let minColIndex = 0;
      for (let i = 1; i < colCount; i++) {
        if (heights[i] < heights[minColIndex]) {
          minColIndex = i;
        }
      }

      cols[minColIndex].push(item);

      // Estimate item height factor: (height / width)
      const ratio = getAspectRatio ? getAspectRatio(item) : 1.33;
      const heightFactor = ratio > 0 ? 1 / ratio : 1;
      heights[minColIndex] += heightFactor;
    });

    return cols;
  }, [items, colCount, getAspectRatio]);

  return (
    <div
      style={{
        display: "flex",
        gap: `${gap}px`,
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      {columns.map((colItems, colIndex) => (
        <div
          key={colIndex}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: `${gap}px`,
            flex: 1,
            minWidth: 0,
          }}
        >
          {colItems.map((item) => (
            <div key={item.id} style={{ width: "100%" }}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
