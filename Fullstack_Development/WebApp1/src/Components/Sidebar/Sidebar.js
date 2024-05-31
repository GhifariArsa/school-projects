import { Stack } from "react-bootstrap";

export default function Sidebar() {
  return (
    <Stack gap={2}>
      <div>
        <Stack gap={1}>
          <div className="p-2">Current Movies</div>
          <div className="p-2">Coming Soon</div>
        </Stack>
      </div>
    </Stack>
  );
}
