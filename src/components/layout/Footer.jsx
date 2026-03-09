import { APP_NAME } from "../../utility/constants";

function Footer() {
  return (
    <footer className="mt-auto py-3 bg-body-tertiary border-top">
      <div className="container small text-muted flex-sm-row text-center ">
        <span>
          Crafted with <i className="bi bi-heart-fill text-danger"></i> by TN
          Sharma for {APP_NAME}
        </span>
      </div>
    </footer>
  );
}
export default Footer;
