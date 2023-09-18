import { getPlayingSettings } from "../context/PlaySettingsContext";
export default function PlayingLevel() {
    const playingSettings = getPlayingSettings()
  return (
    <div>
      <h4>Choose Playing Level</h4>
    </div>
  );
}
