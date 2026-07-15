export default function Header(){
    return (
                 <header
              style={{
                height: 60,
                borderBottom: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                justifyContent: "space-between",
              }}
            >
              <h2 >Dashboard</h2>

              <div>
                <span>Tasks: 12</span>
              </div>
            </header>
    )
}