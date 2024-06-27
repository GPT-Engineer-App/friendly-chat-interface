import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Annotate = () => {
  const [image, setImage] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCanvasClick = (e) => {
    const canvas = e.target;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setAnnotations([...annotations, { x, y }]);
  };

  const generateChartData = () => {
    const labels = annotations.map((_, index) => `Point ${index + 1}`);
    const data = annotations.map(annotation => annotation.y);
    setChartData({
      labels,
      datasets: [
        {
          label: 'Annotated Data',
          data,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4 space-y-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Annotate Chart Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && (
            <div className="relative mt-4">
              <img src={image} alt="Uploaded" className="w-full h-auto" />
              <canvas
                className="absolute top-0 left-0 w-full h-full"
                onClick={handleCanvasClick}
              />
            </div>
          )}
          <Button onClick={generateChartData} className="mt-4">Generate Chart</Button>
          {chartData.labels.length > 0 && (
            <div className="mt-4">
              <Line data={chartData} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Annotate;