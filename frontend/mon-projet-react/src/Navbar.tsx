type NavbarProps = {
  current: "rules" | "timer";
  onNavigate: (page: "rules" | "timer") => void;
};

export default function Navbar({ current, onNavigate }: NavbarProps) {
  return (
    <nav className="navbar">
      <button
        className={`nav-link ${current === "rules" ? "active" : ""}`}
        onClick={() => onNavigate("rules")}
      >
        Rules
      </button>
      <button
        className={`nav-link ${current === "timer" ? "active" : ""}`}
        onClick={() => onNavigate("timer")}
      >
        Timer
      </button>
    </nav>
  );
}