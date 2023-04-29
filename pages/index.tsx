import Link from "next/link";

export default function Home() {
  return (
    <main className={`flex flex-col items-center justify-between p-24`}>
      <h1> Weather Forecast Traffic Cam </h1>
      
      <Link href='/weather' replace>
         link to weather Forecast
      </Link>
    </main>
  )
}
