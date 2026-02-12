import { useState } from "react";
import { CrossIcon } from "./icons/CrossIcon";

interface AvatarCropperProps {
  src: string;
  onClose: () => void;
}

const AVATAR_SIZE = 224; // 56 * 4 (tailwind h-56)

export const AvatarCropper = ({ src, onClose }: AvatarCropperProps) => {
  const [baseScale, setBaseScale] = useState(1);
  const [zoom, setZoom] = useState(1);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;

    const scale = Math.max(
      AVATAR_SIZE / img.naturalWidth,
      AVATAR_SIZE / img.naturalHeight,
    );

    setBaseScale(scale);
  };

  return (
    <div className="absolute inset-0 z-1 grid place-items-center bg-overlay backdrop-blur-sm p-4">
      <div className="px-4 pt-3 w-full max-w-sm flex flex-col gap-4 items-center rounded-lg bg-white">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-base">Настроить отображение фото</h2>
          <CrossIcon onClick={onClose} className="cursor-pointer" />
        </div>

        <div className="w-full flex flex-col items-center pb-6">
         
          <div className="relative mb-6 h-56 w-56 bg-black/20">
         
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <img
                src={src}
                alt="avatar"
                onLoad={handleImageLoad}
                draggable={false}
                className="absolute left-1/2 top-1/2 max-w-none select-none"
                style={{
                  transform: `
                    translate(-50%, -50%)
                    scale(${baseScale * zoom})
                  `,
                  transformOrigin: "center",
                }}
              />
            </div>
          </div>

          <div className="w-full px-8 flex justify-center">
            <input
              type="range"
              min={1}
              max={2}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="
                w-full
                h-[4px]
                appearance-none
                bg-gray/10
                cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:h-4
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-primary
                [&::-moz-range-thumb]:cursor-pointer
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
};