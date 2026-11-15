"use client"

import * as React from "react"
import { PeakChart } from "@/components/ui/peak-chart"

// A second card fed its own series through props. Picking a period swaps the data, which morphs the line.
const USERS: Record<string, { data: number[]; labels: string[]; value: number }> = {
  Weekly: {
    data: [8.1, 8.6, 9.4, 9.1, 10.8, 12.4, 11.9],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    value: 12.4,
  },
  Monthly: {
    data: [5.2, 5.6, 5.4, 6.1, 6.9, 6.6, 7.4, 8.2, 7.9, 8.8, 9.6, 9.2, 10.4, 11.8, 12.8, 12.1],
    labels: Array.from({ length: 16 }, (_, i) => `Day ${i * 2 + 1}`),
    value: 12.8,
  },
  Yearly: {
    data: [2.1, 2.4, 3.2, 3.0, 4.1, 4.8, 5.6, 6.3, 7.9, 9.4, 11.2, 12.8],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    value: 12.8,
  },
}

// Card width follows the panel: two side by side when it is wide, stacked when it is narrow.
// It starts at a fixed size so the server and first client render match, then fits after mounting.
function useFit(panel: React.RefObject<HTMLElement | null>) {
  const [fit, setFit] = React.useState({ width: 300, stacked: false })
  React.useEffect(() => {
    const el = panel.current
    if (!el) return
    const update = () => {
      const w = el.clientWidth
      const stacked = w < 720
      setFit({ width: Math.max(220, Math.min(400, Math.round(stacked ? w - 48 : (w - 120) / 2))), stacked })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [panel])
  return fit
}

/**
 * Two cards, one component: the default conversion card in its reference blue, and an active users
 * card with its own accent, series, labels, headline and period handling. Every difference is a prop.
 */
export function PeakChartDemo() {
  const panel = React.useRef<HTMLElement>(null)
  const { width, stacked } = useFit(panel)
  const [period, setPeriod] = React.useState("Monthly")
  const users = USERS[period]

  return (
    <section
      ref={panel}
      style={{
        display: "flex",
        flexDirection: stacked ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: Math.round(width * 0.14),
        padding: "32px 16px",
        overflow: "hidden",
        borderRadius: 24,
        border: "1px solid rgba(140, 170, 230, 0.1)",
        backgroundColor: "#08101a",
      }}
    >
      <PeakChart width={width} />
      <PeakChart
        width={width}
        accent="#2ec99a"
        data={users.data}
        labels={users.labels}
        value={users.value}
        valueSuffix="k"
        decimals={1}
        title="Active users"
        caption="New peak this period"
        updatedText="Live"
        period={period}
        onPeriodChange={setPeriod}
        formatValue={(v) => `${v.toFixed(1)}k`}
      />
    </section>
  )
}
