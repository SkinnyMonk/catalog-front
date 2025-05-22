import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function StockChart({ stockData, compare }) {
  const chartRef = useRef(null);
  const myChartRef = useRef(null);
  const crosshairRef = useRef({ show: false, x: 0, y: 0 });
  const openStockValues = stockData.values.map((entry) =>
    parseFloat(parseFloat(entry.open).toFixed(2))
  );
  const openStockVolume = stockData.values.map(
    (entry) => parseInt(entry.volume) / 3000000
  );
  console.log("comp", compare);

  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    price: null,
    canvasLeft: 0,
    canvasTop: 0,
  });

  const lastIndex = openStockValues.length * 3 - 1;
  const lastPrice = openStockValues[openStockValues.length - 1];
  const [lastY, setLastY] = useState(null);

  useEffect(() => {
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const crosshairPlugin = {
      id: "crosshairPlugin",
      afterDraw: (chart) => {
        const crosshair = crosshairRef.current;
        if (!crosshair.show) return;
        const ctx = chart.ctx;
        ctx.save();
        ctx.setLineDash([6, 6]);
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(crosshair.x, chart.chartArea.top);
        ctx.lineTo(crosshair.x, chart.chartArea.bottom);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(chart.chartArea.left, crosshair.y);
        ctx.lineTo(chart.chartArea.right, crosshair.y);
        ctx.stroke();

        ctx.restore();
      },
    };

    Chart.register(crosshairPlugin);

    const datasets = [
      {
        type: "line",
        label: "Stock Price",
        data: [...openStockValues, ...openStockValues, ...openStockValues],
        borderColor: "#5F5FFF",
        borderWidth: 3,
        fill: true,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(95, 95, 255, 0.1)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          return gradient;
        },
        tension: 0,
        pointRadius: 0,
        pointHitRadius: 16,
        yAxisID: "y",
      },
      {
        type: "bar",
        label: "Volume",
        data: [...openStockVolume, ...openStockVolume, ...openStockVolume],
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        barThickness: 3,
        borderRadius: 0,
        yAxisID: "y1",
      },
    ];

    if (compare) {
      datasets.push({
        type: "line",
        label: "Compare Stock Price",
        data: [
          ...openStockValues.map((val) => val * 0.9),
          ...openStockValues.map((val) => val * 0.9),
          ...openStockValues.map((val) => val * 0.9),
        ],
        borderColor: "#FF5733",
        borderWidth: 2,
        fill: false,
        tension: 0,
        pointRadius: 0,
        pointHitRadius: 16,
        yAxisID: "y",
      });
    }

    const data = {
      labels: Array.from(
        { length: 3 * openStockValues.length },
        (_, i) => `T${i + 1}`
      ),
      datasets: datasets, // Use the modified datasets array
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 0,
        margin: 0,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: false,
          external: () => {},
        },
      },
      hover: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          offset: false,
          grid: {
            display: true,
            drawBorder: false,
            drawTicks: false,
            color: (ctx) => {
              const index = ctx.tick?.value;
              return index % 5 === 0 ? "#ddd" : "transparent";
            },
            lineWidth: 1,
          },
          ticks: {
            display: false,
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
          min: 0,
          max: Math.max(...openStockValues) + Math.max(...openStockValues) / 10,
        },
        y1: {
          display: false,
          position: "right",
          grid: {
            drawOnChartArea: false,
          },
          min: 0,
          max: Math.max(...openStockValues) + Math.max(...openStockValues) / 10,
        },
      },
      onHover: (event, elements, chart) => {
        if (elements && elements.length > 0) {
          const el = elements[0];
          const meta = chart.getDatasetMeta(el.datasetIndex);
          const point = meta.data[el.index];
          const canvasRect = chart.canvas.getBoundingClientRect();

          crosshairRef.current = {
            show: true,
            x: point.x,
            y: point.y,
          };
          chart.draw();

          setTooltip({
            show: true,
            x: point.x,
            y: point.y,
            price: data.datasets[0].data[el.index],
            canvasLeft: canvasRect.left,
            canvasTop: canvasRect.top,
          });
        } else {
          crosshairRef.current = { show: false, x: 0, y: 0 };
          chart.draw();
          setTooltip((prev) => ({ ...prev, show: false }));
        }
      },
    };

    myChartRef.current = new Chart(ctx, {
      type: "bar",
      data,
      options,
      plugins: [crosshairPlugin],
    });
    const chart = myChartRef.current;
    const meta = chart.getDatasetMeta(0);
    if (meta && meta.data && meta.data.length > 0) {
      const lastPoint = meta.data[lastIndex];
      if (lastPoint) {
        const canvasRect = chartRef.current.getBoundingClientRect();
        const parentRect = chartRef.current.parentNode.getBoundingClientRect();
        setLastY(lastPoint.y + (canvasRect.top - parentRect.top));
      } else {
        setLastY(null);
      }
    }

    return () => {
      myChartRef.current?.destroy();
    };
  }, [lastIndex, compare]);

  const priceTooltipStyle = tooltip.show
    ? {
        position: "absolute",
        right: -40,
        top: tooltip.canvasTop + tooltip.y - 350,
        background: "#000",
        border: "1px solid #ccc",
        borderRadius: 4,
        padding: "4px 8px",
        pointerEvents: "none",
        fontSize: 12,
        color: "#fff",
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }
    : { display: "none" };
  const lastPriceTooltipStyle = {
    position: "absolute",
    right: -40,
    top: lastY !== null ? lastY - 215 : "90%",
    background: "#4B40EE",
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "4px 8px",
    pointerEvents: "none",
    fontSize: 12,
    color: "#fff",
    zIndex: 1000,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transform: lastY !== null ? "translateY(-50%)" : undefined,
  };

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        position: "relative",
        marginTop: "28px",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        borderTop: "none",
      }}
      onMouseLeave={() => {
        setTooltip((prev) => ({ ...prev, show: false }));
        crosshairRef.current = { show: false, x: 0, y: 0 };
      }}
    >
      <canvas ref={chartRef}></canvas>
      {tooltip.show && (
        <div style={priceTooltipStyle}>
          <b>{tooltip.price}</b>
        </div>
      )}
      <div style={lastPriceTooltipStyle}>
        <b>{lastPrice}</b>
      </div>
    </div>
  );
}
