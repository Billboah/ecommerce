import Skeleton from "react-loading-skeleton";

export const Loader = () => (
  <Skeleton
    className="absolute top-0 left-0 w-full h-full"
    baseColor="#e0e0e0"
    highlightColor="#f5f5f5"
    containerClassName="w-full h-full"
  />
);
export const loaderCircle = (size: number) => (
  <Skeleton
    circle
    width={size}
    height={size}
    baseColor="#e0e0e0"
    highlightColor="#f5f5f5"
  />
);
export const LoaderText = ({ lines }: { lines: number }) => (
  <Skeleton
    count={lines}
    width="100%"
    height={20}
    baseColor="#e0e0e0"
    highlightColor="#f5f5f5"
  />
);
