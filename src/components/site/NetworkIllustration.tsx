export function NetworkIllustration({ compact = false }: { compact?: boolean }) {
  const nodes = [
    [24, 30],
    [66, 56],
    [104, 20],
    [142, 88],
    [182, 42],
    [220, 112],
    [258, 26],
    [304, 68],
    [344, 24],
    [388, 98],
    [430, 45],
    [470, 114],
    [512, 26],
    [558, 70],
    [604, 42],
    [650, 104],
  ];

  return (
    <svg
      viewBox="0 0 680 150"
      aria-hidden="true"
      className={compact ? "h-16 w-full" : "h-auto w-full"}
      fill="none"
    >
      <path
        d="M24 30 104 20 142 88 220 112 258 26 344 24 388 98 470 114 512 26 604 42 650 104"
        className="network-line"
      />
      <path
        d="M66 56 182 42 220 112 304 68 388 98 430 45 558 70 650 104"
        className="network-line network-line-muted"
      />
      <path
        d="M24 30 142 88 258 26 388 98 512 26 650 104"
        className="network-line network-line-accent"
      />
      {nodes.map(([x, y], index) => (
        <rect
          key={`${x}-${y}`}
          x={x - (index % 4 === 0 ? 4 : 2.5)}
          y={y - (index % 4 === 0 ? 4 : 2.5)}
          width={index % 4 === 0 ? 8 : 5}
          height={index % 4 === 0 ? 8 : 5}
          className={index % 4 === 0 ? "network-node-accent" : "network-node"}
        />
      ))}
    </svg>
  );
}

export function HeroNetworkMark() {
  const points = [
    [46, 40],
    [110, 40],
    [190, 250],
    [265, 80],
    [340, 250],
    [420, 40],
    [500, 40],
    [225, 40],
    [300, 250],
    [375, 80],
    [455, 250],
    [535, 40],
    [610, 40],
  ];

  return (
    <svg viewBox="0 0 660 300" aria-hidden="true" className="h-auto w-full" fill="none">
      <path
        d="M46 40h64l80 210 75-170 75 170 80-210h80"
        className="network-line network-line-accent"
      />
      <path d="M225 40h64l86 210 80-170 80 170 75-210" className="network-line" />
      <path
        d="M110 40 300 250M265 80 455 250M340 250 535 40"
        className="network-line network-line-muted"
      />
      {points.map(([x, y], index) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={index % 3 === 0 ? 4 : 2.8}
          className={index % 3 === 0 ? "network-node-accent" : "network-node"}
        />
      ))}
    </svg>
  );
}
