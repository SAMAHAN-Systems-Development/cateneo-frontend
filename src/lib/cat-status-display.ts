export const formatCatStatus = (status?: string) =>
  status
    ?.trim()
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2") || "N/A";
