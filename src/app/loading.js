import Image from "next/image";

export default function Loading() {
  return (
    <div id="preloader">
      <div>
        <Image
          src="/Assets/Images/logo/logo.png"
          width={550}
          height={200}
          alt=""
        />
      </div>
    </div>
  );
}
