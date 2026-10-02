"use client";

import type { ReactNode } from "react";

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Row } from "@/core/components/layout";
import { Typography } from "@/core/components/typography";
import { cn } from "@/core/utils/cn";

const chartColors = [
  "#296b66",
  "#5a2889",
  "#52b49b",
  "#8b49ca",
  "#7c7c8a",
  "#a9a9b2",
];

type ChartProps = {
  title: string;
  data: Array<{ name: string; value: number }>;
  description?: string;
};

function EmptyChart() {
  return (
    <div className="border-border grid h-64 place-items-center rounded-lg border border-dashed text-sm text-gray-400">
      Sem respostas
    </div>
  );
}

export function Card({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "border-border bg-component rounded-2xl border p-5 shadow-sm",
        className,
      )}
    >
      <Typography fontFamily="baloo2" fontWeight="semibold" size="lg">
        {title}
      </Typography>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function CountCard({ label, value }: { label: string; value: number }) {
  return (
    <Card title={label}>
      <Typography fontFamily="baloo2" fontWeight="bold" size={34}>
        {value}
      </Typography>
    </Card>
  );
}

export function AverageCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <Card title={label}>
      <Row className="items-end gap-2">
        <Typography fontFamily="baloo2" fontWeight="bold" size={34}>
          {value.toFixed(1)}
        </Typography>
        <Typography className="pb-1" color="gray-400">
          / 5
        </Typography>
      </Row>
    </Card>
  );
}

export function PercentageCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <Card title={label}>
      <Row className="items-end gap-2">
        <Typography fontFamily="baloo2" fontWeight="bold" size={34}>
          {value.toFixed(0)}%
        </Typography>
      </Row>
    </Card>
  );
}

export function BarChartCard({ title, data, description }: ChartProps) {
  return (
    <Card title={title}>
      {description && (
        <Typography className="mb-4" color="gray-400" size="sm">
          {description}
        </Typography>
      )}
      {data.length === 0 ? (
        <EmptyChart />
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 8, left: -14, bottom: 24 }}
            >
              <XAxis
                dataKey="name"
                interval={0}
                tick={{ fontSize: 11 }}
                angle={-20}
                textAnchor="end"
                height={60}
              />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#296b66" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}

export function HorizontalBarChartCard({
  title,
  data,
  description,
}: ChartProps) {
  return (
    <Card title={title}>
      {description && (
        <Typography className="mb-4" color="gray-400" size="sm">
          {description}
        </Typography>
      )}
      {data.length === 0 ? (
        <EmptyChart />
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 8, right: 16, left: 24, bottom: 8 }}
            >
              <XAxis
                type="number"
                allowDecimals={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={170}
                tick={{ fontSize: 11 }}
              />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="#5a2889" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}

export function DonutChartCard({ title, data, description }: ChartProps) {
  return (
    <Card title={title}>
      {description && (
        <Typography className="mb-4" color="gray-400" size="sm">
          {description}
        </Typography>
      )}
      {data.length === 0 ? (
        <EmptyChart />
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={95}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
