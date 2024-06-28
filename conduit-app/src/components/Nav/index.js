import useAuth from "../../app/components/hooks/useAuth";
import Link from "next/link";

export default function Nav() {
  // localStorage.clear();
  const isauthenticated = useAuth();
  return (
    <>
      <nav className="head">
        <a className="brand" href="/">
          conduit
        </a>
        <div className="navcontainer">
          <ul className="navlist">
            <li>
              <Link className="home" href="/">
                Home
              </Link>
            </li>

            {!isauthenticated ? (
              <>
                <Link href="/Signin" className="sign">
                  <li>Sign in</li>
                </Link>
                <li>
                  <Link className="sign" href="/Signup">
                    Sign up
                  </Link>
                </li>
              </>
            ) : (
              <div className="newnav">
                <li className="newitems">
                  <Link className="newarticle" href="/NewArticles">
                    New Article
                  </Link>
                </li>
                <li>
                  <Link className="newsettings" href="/Settings">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link className="newprofile" href="/profile">
                    Profile
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
