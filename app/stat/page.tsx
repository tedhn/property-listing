"use client";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { propertiesAtom } from "../data";
import { useAtom } from "jotai";
import { PropertyType } from "../types";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface MedianPrice {
  location: string;
  median: number;
}

interface CountByLocation {
  [location: string]: number;
}
const StatPage = () => {
  const [properties] = useAtom(propertiesAtom);

  const [chartData, setChartData] = useState<{
    medianPrices: MedianPrice[];
    countByLocation: CountByLocation;
  }>({
    medianPrices: [],
    countByLocation: {},
  });

  const processPropertyData = (properties: PropertyType[]) => {
    const priceByLocation: Record<string, number[]> = {};
    const countByLocation: CountByLocation = {};

    properties.forEach((property) => {
      const { location, price } = property;

      // Collect prices for median calculation
      if (!priceByLocation[location]) {
        priceByLocation[location] = [];
      }
      priceByLocation[location].push(price);

      // Count properties by location
      countByLocation[location] = (countByLocation[location] || 0) + 1;
    });

    // Calculate median prices
    const medianPrices = Object.entries(priceByLocation).map(
      ([location, prices]) => {
        const sortedPrices = prices.sort((a, b) => a - b);
        const middle = Math.floor(sortedPrices.length / 2);
        const median =
          sortedPrices.length % 2 === 0
            ? (sortedPrices[middle - 1] + sortedPrices[middle]) / 2
            : sortedPrices[middle];
        return { location, median };
      }
    );

    return { medianPrices, countByLocation };
  };

  // Chart for Median Property Price by Location
  const medianPricesChart: {
    series: ApexAxisChartSeries;
    options: ApexOptions;
  } = {
    series: [
      {
        name: "Median Price ($)",
        data: chartData.medianPrices.map((item) => item.median),
      },
    ],
    options: {
      chart: {
        type: `bar`,
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: chartData.medianPrices.map((item) => item.location),
      },
      yaxis: {
        title: {
          text: "Price ($)",
        },
      },
    },
  };

  // Chart for Number of Properties in Each Location
  const propertiesByLocationChart: {
    series: number[];
    options: ApexOptions;
  } = {
    series: Object.values(chartData.countByLocation),
    options: {
      chart: {
        type: "pie",
        height: 350,
      },
      labels: Object.keys(chartData.countByLocation),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  useEffect(() => {
    const { medianPrices, countByLocation } = processPropertyData(properties);
    setChartData({ medianPrices, countByLocation });
  }, [properties]);

  return (
    <div className="container mx-auto p-6">
      {" "}
      {/* ApexCharts for Median Price by Location */}
      <div className="mb-10">
        <Typography variant="h6" className="font-semibold mb-4">
          Median Property Price by Location
        </Typography>
        <ReactApexChart
          options={medianPricesChart.options}
          series={medianPricesChart.series}
          type="bar"
          height={350}
        />
      </div>
      {/* ReactApexChart for Number of Properties by Location */}
      <div className="mb-10">
        <Typography variant="h6" className="font-semibold mb-4">
          Number of Properties by Location
        </Typography>
        <ReactApexChart
          options={propertiesByLocationChart.options}
          series={propertiesByLocationChart.series}
          type="pie"
          height={350}
        />
      </div>
    </div>
  );
};

export default StatPage;
