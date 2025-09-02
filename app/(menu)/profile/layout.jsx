import NavbarLayout from "@/components/navbar-layout";

const LayoutProfile = ({ children }) => {
  return (
    <NavbarLayout title="Profile">
      <div className="max-w-screen-xl p-6 mx-auto w-full">{children}</div>
    </NavbarLayout>
  );
};

export default LayoutProfile;
