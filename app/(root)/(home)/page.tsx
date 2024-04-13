import Navbar from "@/components/shared/navbar/Navbar";
// import { UserButton } from "@clerk/nextjs";

const Home = () => {
    return(
        <div>
             {/* <UserButton afterSignOutUrl="/" /> */}
             <Navbar/>
        </div>
    )
}
export default Home;