import { Preloader } from "react-materialize";

export default function Loader() {
  return (
    <div className="loading-wrapper">
      <Preloader className="loading-spinner" />
    </div>
  )
}