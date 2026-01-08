import jsPDF from "jspdf";

export default function generateReport(data) {
  const doc = new jsPDF();
  const today = new Date().toLocaleString();

  // HEADER
  doc.setFontSize(20);
  doc.text("Arena Operations Analytics Report", 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${today}`, 14, 28);

  doc.setDrawColor(200);
  doc.line(14, 32, 195, 32);

  // KPI SUMMARY
  doc.setTextColor(0);
  doc.setFontSize(14);
  doc.text("Key Metrics", 14, 42);

  doc.setFontSize(12);
  doc.text(`• Total Events: ${data.totalEvents}`, 20, 52);
  doc.text(`• High Risk Zones: ${data.highRiskZones}`, 20, 60);
  doc.text(`• Predicted Peak Time: ${data.peakTime}`, 20, 68);

  // ZONE DENSITY
  doc.setFontSize(14);
  doc.text("Zone Crowd Density", 14, 82);

  let y = 92;
  doc.setFontSize(12);

  Object.entries(data.heatmap || {}).forEach(([zone, value]) => {
    const risk =
      value >= 100 ? "HIGH RISK" :
      value >= 60 ? "MODERATE" :
      "LOW";

    doc.text(`${zone} | ${value}% | ${risk}`, 20, y);
    y += 8;
  });

  // ALERTS
  y += 10;
  doc.setFontSize(14);
  doc.text("Active Alerts", 14, y);

  y += 10;
  doc.setFontSize(12);

  if (!data.alerts || data.alerts.length === 0) {
    doc.text("No active alerts. Venue operations are stable.", 20, y);
  } else {
    data.alerts.forEach((alert, index) => {
      doc.text(`- ${alert}`, 20, y + index * 8);
    });
  }

  // FOOTER
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(
    "This report is system-generated using Arena Venue Optimizer",
    14,
    285
  );

  doc.save("arena-analytics-report.pdf");
}