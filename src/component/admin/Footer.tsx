import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="py-4 bg-gray-100 mt-auto">
        <div className="container-fluid px-4">
          <div className="flex items-center justify-between">
            <div className="text-base">Copyright © LightHub 2023</div>
            <div className="text-base flex justify-between gap-2.5">
              <Link className="hover:text-info" href="#">Privacy Policy</Link>
              ·
              <Link className="hover:text-info" href="#">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    )
}