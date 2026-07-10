import Image from "next/image";
import Link from "next/link";
import GlobeImage from"@/public/globe.svg";


export  default function Sidebar(){
    return (
            <aside style={{ width: 200, padding: 16, borderRight: "1px solid #ddd" }}>
      <Image width={100} height={100}  src={GlobeImage.src} alt="sss"/>

      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link  href="/">Dashboard</Link></li>
          <li><Link href="/settings">Settings</Link></li>
        </ul>
      </nav>
    </aside>
    )
}