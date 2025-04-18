import React from 'react'


const DecreasingBars = ({ 
  width = 181,
  height = 115,
  barHeight = 11,
  barColor = "#fd7e14",
  borderColor = "#0d6efd",
  borderStyle = "dashed",
  borderWidth = 1,
  borderRadius = 36,
  barSpacing = 10,
  bars = 5,
  className = "",
  style = {}
}) => {
  // Calculate the heights and spacing to fit within the container
  const totalBarSpace = bars * barHeight + (bars - 1) * barSpacing;
  const verticalPadding = (height - totalBarSpace) / 2;
  
  return (
    <div 
      className={`decreasing-bars ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
        border: `${borderWidth}px ${borderStyle} ${borderColor}`,
        padding: `${verticalPadding}px 10px`,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...style,
      }}
    >
      {[...Array(bars)].map((_, index) => (
        <div
          key={index}
          style={{
            height: `${barHeight}px`,
            width: `${100 - (index * (80 / (bars - 1)))}%`,
            backgroundColor: barColor,
            borderRadius: `${barHeight / 2}px`,
          }}
        />
      ))}
    </div>
  );
};

// Usage example component
const Bar = () => {
  return (
    <div className="p-4">
      <h3 className="mb-4">Decreasing Bars Component</h3>
      
      <div className="mb-4">
        <h4 className="text-lg font-medium mb-2">Default</h4>
        <DecreasingBars />
      </div>
      
      <div className="mb-4">
        <h4 className="text-lg font-medium mb-2">Custom Colors</h4>
        <DecreasingBars 
          barColor="#ff5722"
          borderColor="#2196f3"
        />
      </div>
      
      <div className="mb-4">
        <h4 className="text-lg font-medium mb-2">More Bars</h4>
        <DecreasingBars 
          bars={7}
          height={150}
        />
      </div>
      
      <div className="mb-4">
        <h4 className="text-lg font-medium mb-2">Different Size</h4>
        <DecreasingBars 
          width={300}
          height={200}
          barHeight={15}
          borderRadius={20}
        />
      </div>
    </div>
  );
};

  
 

export default Bar
