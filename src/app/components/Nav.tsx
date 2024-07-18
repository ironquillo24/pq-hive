"use client";
import Link from "next/link";
import Image from "next/image";
import Cart from "./buttons/Cartbutton";
import { SessionData } from "@/lib";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Avatar, Dropdown, DropdownItem, Navbar } from "flowbite-react";

interface NavProps {
  session: SessionData;
}

const Nav = ({ session }: NavProps) => {
  const path = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const pages = [
    { path: "/", title: "PQ-HIVES" },
    { path: "/myhardware", title: "My Hardware" },
    { path: "/returned-hardware", title: "Returned Hardware" },
  ];

  const onSignout = () => {
    queryClient.clear();
    router.replace("/logout");
  };

  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <Image
            src="/assets/logo.png"
            width={120}
            height={120}
            alt="Flowbite React Logo"
            className="h-auto w-auto"
            priority={true}
          />
        </Navbar.Brand>
        {session?.isLoggedIn ? (
          <>
            <div className="flex md:order-2 ">
              <Cart />
              <Link
                href="/profile"
                className="self-center mx-4 font-medium hover:underline hover:font-bold"
              >
                Hi, {session?.nickName}
              </Link>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img={""}
                    rounded
                    placeholderInitials="RR"
                    bordered
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm text-center font-medium">
                    {session?.fullName}
                  </span>
                  {/* <span className="block truncate text-sm font-medium">{session?.email}</span> */}
                </Dropdown.Header>
                <Dropdown.Item as={Link} href="/profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} href="/profile">
                  Settings
                </Dropdown.Item>
                {session?.isSuperAdmin ? (
                  <DropdownItem as={Link} href="/admin">
                    Admin Controls
                  </DropdownItem>
                ) : null}
                <Dropdown.Divider />
                <Dropdown.Item onClick={onSignout}>Sign out</Dropdown.Item>
              </Dropdown>
            </div>

            <Navbar.Toggle />
            <Navbar.Collapse>
              {pages.map((page, ind) => {

                if (page.path === "/returned-hardware" && !session.isAdmin){
                  return null
                } else {
                return <Navbar.Link
                  href={page.path}
                  active={path === page.path}
                  key={ind}
                >
                  <span
                    className={`block text-sm text-center font-medium ${
                      path === page.path ? "border-0 border-b-2" : null
                    }`}
                  >
                    {page.title}
                  </span>
                </Navbar.Link> }
              })}
              {/*           <Navbar.Link href="/" active><span className="block text-sm text-center font-medium">PQ-HIVES</span></Navbar.Link>
          <Navbar.Link href="/myhardware"><span className="block text-sm text-center font-medium">My Hardware</span></Navbar.Link>
          <Navbar.Link href="/returned-hardware"><span className="block text-sm text-center font-medium">Returned Hardware</span></Navbar.Link> */}
            </Navbar.Collapse>
          </>
        ) : null}
      </Navbar>
    </>
  );
};

export default Nav;
