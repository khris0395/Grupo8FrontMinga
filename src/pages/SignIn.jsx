import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { findAuthor, findCompany, login } from "../store/actions/authActions";
import { NavLink } from "react-router-dom";
import { loginWithGoogle } from "../store/actions/authActions";

const SignInComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { loading, error, successMessage } = useSelector((state) => state.authStore);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Inicia sesión
      const loginResponse = await dispatch(login({ email, password })).unwrap()

      console.log(loginResponse);
      
      console.log(loginResponse.user._id);
      console.log(loginResponse.token);
      
      
      if (loginResponse.token && loginResponse.user.role===1) {
        dispatch(findAuthor({ user_id: loginResponse.user._id, token: loginResponse.token }));
      }else if(loginResponse.token && loginResponse.user.role===2){
        dispatch(findCompany({ user_id: loginResponse.user._id, token: loginResponse.token }))
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };


    return (
      <div className="flex">
        <div
          className="hidden lg:flex w-1/2 bg-cover bg-center border-l-2 border-black"
          style={{
            backgroundImage: "url('https://s3-alpha-sig.figma.com/img/5d98/eac1/025f012e94a72840af6fc1f67a349f61?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p-uwqxaKoRDHMjL8mrQGtvc6-B34ZQjhKyqflHNy~hQ~jbwozfSm0~5Xifrl3Cmwq14DLmJiIwx8Oc~nlfTXg-qD8GDhU7iYatDtKOBAg0lJuH4G8WBpkWRwgJY3in8YB7Euffarhv6geVvIDIwPd7YRjyLKhvAjN44WdMukjk4DM8tIx30Rrm1wOR1hcUfoU3Zu13kqCZV4MVdBck-7Ht19DB1RMYd~Qd~X8dubC74ueXk~SJ-PPHvaRYulSu6jYOuxC1XIbUNiIQoJ7bFYmlzNJ-J9cNfA6g541SOFDANfY7EfKGUsyGL9~j13oAic9nsNUZ1kotyFwtepa1eUKg__')",
            filter: "brightness(0.6) saturate(1.5) sepia(0.7) hue-rotate(220deg)"
          }}
        ></div>
        {/* Formulario */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white px-6 py-28">
          <div className="max-w-sm w-full">
            <div className="text-center flex flex-col items-center mb-8">
              {/* Logo */}
              <div className="flex">
                <svg width="81" height="48" viewBox="0 0 81 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M80.0628 0.00397865C80.1727 0.00397866 80.2698 0.00273889 80.3556 0.00164789C80.6871 -0.00257495 80.85 -0.00464631 80.9285 0.0750923C81.0042 0.152069 81.0012 0.305294 80.9953 0.606438C80.9934 0.702721 80.9912 0.814121 80.9912 0.942986C80.9971 16.1271 81 31.3132 81 46.5012L81 47.4139C81 47.9697 80.9868 47.9872 80.4007 47.9989L1.01943 47.9989C0.945641 47.9989 0.877129 47.9992 0.813553 47.9995C0.384315 48.0014 0.179314 48.0024 0.0829697 47.9013C-0.00509642 47.8088 -0.00237271 47.6312 0.0028382 47.2911C0.00424964 47.1986 0.00586708 47.0931 0.00586709 46.9751L0.00587111 0.995637C0.00587112 0.869057 0.00400193 0.75845 0.00237688 0.661812C-0.00316966 0.332676 -0.00598489 0.165433 0.0767254 0.0818525C0.161869 -0.00418798 0.337643 -0.0018877 0.694371 0.00280823C0.793087 0.00410523 0.905781 0.00559297 1.03412 0.00543277L80.0628 0.00397865ZM6.05494 5.0603C5.82138 5.0603 5.58636 5.06762 5.35133 5.08225C5.2525 5.08376 5.17231 5.16232 5.16918 5.26069C5.15449 5.49325 5.1442 5.72727 5.1442 5.96129L5.1442 42.5345C5.15888 42.811 5.21471 42.8724 5.47178 42.887C5.64367 42.8954 5.81752 42.895 5.99092 42.8945L6.10635 42.8943L45.797 42.8943C45.9178 42.8943 46.0244 42.8958 46.1183 42.8971C46.468 42.902 46.559 42.9878 46.7287 42.8189C46.8979 42.6506 46.8122 42.5607 46.8074 42.2152C46.806 42.1184 46.8045 42.008 46.8047 41.8822L46.8047 17.3845C46.8047 17.1505 46.8091 16.9164 46.8179 16.6824C46.8159 16.6234 46.8381 16.566 46.8793 16.5236C46.9206 16.4811 46.9774 16.4571 47.0368 16.4572C47.1934 16.4462 47.35 16.4454 47.5067 16.4446L47.6008 16.444L52.3235 16.444C52.4394 16.444 52.5414 16.4426 52.6312 16.4413C52.9613 16.4366 53.1258 16.4343 53.2067 16.5148C53.2871 16.5947 53.2849 16.7563 53.2806 17.0785C53.2795 17.1619 53.2783 17.2563 53.2783 17.3625C53.2783 26.9843 53.2783 32.3789 53.2783 42.0007C53.2783 42.083 53.2776 42.1578 53.277 42.2257C53.274 42.5545 53.1984 42.6408 53.3564 42.8086C53.529 42.992 53.626 42.8972 53.998 42.8951C54.0601 42.8947 54.1276 42.8943 54.2008 42.8943L73.7376 42.8943C74.0484 42.8943 74.3592 42.903 74.6695 42.9117C74.7815 42.9148 74.8934 42.9179 75.0053 42.9207C75.23 42.9207 75.2991 42.8753 75.2991 42.6398C75.3123 42.1484 75.3196 41.6584 75.3196 41.167L75.3196 6.77159C75.3196 6.51417 75.3196 6.25675 75.3108 5.99932C75.3068 5.86224 75.3061 5.745 75.3055 5.64476C75.3039 5.36122 75.303 5.2137 75.2283 5.13766C75.1473 5.05519 74.9794 5.0568 74.6294 5.06016C74.5508 5.06092 74.4629 5.06177 74.3648 5.06177L6.05494 5.0603Z" fill="black"/>
                <path d="M32 43L23 43L23 17C23 16.4477 23.4477 16 24 16L31 16C31.5523 16 32 16.4477 32 17L32 43Z" fill="black"/>
                <path d="M55 43L46 43L46 17C46 16.4477 46.4477 16 47 16L54 16C54.5523 16 55 16.4477 55 17L55 43Z" fill="black"/>
                </svg>
                <div className="border-4 border-blue-800 flex items-center justify-center w-28">
                    <svg width="85" height="25" viewBox="0 0 85 25" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.857 20.768V4.512C2.857 4.04267 2.67567 3.73333 2.313 3.584C1.95033 3.43467 1.49167 3.36 0.937 3.36H0.617V1.28H11.273V3.36H10.921C10.3877 3.36 9.93967 3.43467 9.577 3.584C9.21433 3.73333 9.033 4.04267 9.033 4.512V20.768C9.033 21.2373 9.21433 21.5467 9.577 21.696C9.93967 21.8453 10.3877 21.92 10.921 21.92H11.273V24H0.617V21.92H0.937C1.49167 21.92 1.95033 21.8453 2.313 21.696C2.67567 21.5467 2.857 21.2373 2.857 20.768ZM13.2733 24V21.92H13.5933C13.9773 21.92 14.3079 21.8773 14.5853 21.792C14.8626 21.7067 15.0866 21.568 15.2573 21.376C15.4279 21.1627 15.5133 20.896 15.5133 20.576V4.512C15.5133 4.192 15.4279 3.95733 15.2573 3.808C15.0866 3.63733 14.8626 3.52 14.5853 3.456C14.3079 3.392 13.9773 3.36 13.5933 3.36H13.2733V1.28H23.2573L31.8333 18.976L31.0333 18.688V3.872C31.0333 3.76533 30.9266 3.68 30.7133 3.616C30.5213 3.552 30.2546 3.49867 29.9132 3.456C29.5933 3.392 29.2626 3.36 28.9213 3.36H28.5053V1.28H35.8973V3.36H35.5773C35.2146 3.36 34.8839 3.40267 34.5853 3.488C34.3079 3.552 34.0839 3.66933 33.9133 3.84C33.7426 4.01067 33.6573 4.26667 33.6573 4.608V24H27.8973L17.2733 2.528L18.1373 2.752V21.44C18.1373 21.504 18.2439 21.5787 18.4573 21.664C18.6706 21.728 18.9373 21.792 19.2573 21.856C19.5773 21.8987 19.9079 21.92 20.2493 21.92H20.6973V24H13.2733ZM58.9915 15.744V20.672C58.6715 21.0773 58.2022 21.504 57.5835 21.952C56.9862 22.3787 56.2715 22.7733 55.4395 23.136C54.6288 23.4773 53.7222 23.7653 52.7195 24C51.7382 24.2133 50.7035 24.32 49.6155 24.32C47.8448 24.32 46.2342 24.0427 44.7835 23.488C43.3542 22.9333 42.1168 22.144 41.0715 21.12C40.0262 20.096 39.2155 18.8693 38.6395 17.44C38.0848 16.0107 37.8075 14.4107 37.8075 12.64C37.8075 10.9333 38.0955 9.36533 38.6715 7.936C39.2688 6.50667 40.0902 5.26933 41.1355 4.224C42.1808 3.17867 43.3968 2.37867 44.7835 1.824C46.1915 1.248 47.7062 0.959999 49.3275 0.959999C50.8635 0.959999 52.1435 1.216 53.1675 1.728C54.1915 2.24 55.0128 2.944 55.6315 3.84C56.2715 4.736 56.7728 5.76 57.1355 6.912L55.4395 6.592L56.0475 1.28H58.5755V8.416H55.6635C55.3648 7.456 54.9702 6.61333 54.4795 5.888C53.9888 5.14133 53.3808 4.56533 52.6555 4.16C51.9515 3.75467 51.0875 3.552 50.0635 3.552C49.1675 3.552 48.3568 3.76533 47.6315 4.192C46.9275 4.61867 46.3195 5.22667 45.8075 6.016C45.3168 6.80533 44.9328 7.76533 44.6555 8.896C44.3995 10.0053 44.2715 11.2533 44.2715 12.64C44.2715 14.1333 44.3995 15.456 44.6555 16.608C44.9115 17.7387 45.2848 18.688 45.7755 19.456C46.2875 20.2027 46.8955 20.768 47.5995 21.152C48.3035 21.536 49.0822 21.728 49.9355 21.728C50.5755 21.728 51.1195 21.6533 51.5675 21.504C52.0155 21.3547 52.3888 21.184 52.6875 20.992C52.9862 20.7787 53.2208 20.5867 53.3915 20.416V15.744C53.3915 15.2747 53.2102 14.9653 52.8475 14.816C52.5062 14.6667 52.0475 14.592 51.4715 14.592H51.1515V12.512H60.7835V14.592H60.5915C60.1435 14.592 59.7595 14.6667 59.4395 14.816C59.1408 14.9653 58.9915 15.2747 58.9915 15.744ZM66.5613 14.272H75.3613L75.3933 16.64H66.4653L66.5613 14.272ZM70.2093 3.36L71.2653 4.768L65.8253 21.344C65.8253 21.4507 65.9213 21.5573 66.1133 21.664C66.3053 21.7493 66.5506 21.8133 66.8493 21.856C67.1479 21.8987 67.4573 21.92 67.7773 21.92H68.2253V24H61.5693V21.92H61.7293C62.1773 21.92 62.5293 21.8347 62.7853 21.664C63.0626 21.472 63.2866 21.0987 63.4573 20.544L69.8253 1.28H75.7453L82.3053 21.024C82.4333 21.3867 82.6359 21.632 82.9133 21.76C83.1906 21.8667 83.5426 21.92 83.9693 21.92H84.0973V24H73.6653V21.92H74.1773C74.4759 21.92 74.7746 21.9093 75.0733 21.888C75.3933 21.8667 75.6493 21.8347 75.8413 21.792C76.0333 21.728 76.1293 21.664 76.1293 21.6L70.2093 3.36Z" fill="#4338CA"/>
                    </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold mt-4">Welcome back!</h1>
              <p className="text-gray-500 mt-2">
                Discover manga, manhua, and manhwa. Track your progress, have fun,
                read manga!
              </p>
            </div>
            {/* Formulario */}
            <form 
            onSubmit={handleSubmit}
            >
              <div className="mb-6 relative">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="peer mt-1 block w-full rounded-md border-2 focus:ring-0 focus:border-transparent sm:text-sm pt-5 pb-3 pl-4"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 text-sm font-medium transition-all duration-300 
                    transform -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 
                    peer-focus:left-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:bg-white 
                    peer-focus:px-1 ${email ? "top-0 left-4 text-xs font-semibold text-blue-600 bg-white px-1" : "top-1/2 text-sm"
                  }`}
                >
                  Email
                </label>
              </div>
              <div className="mb-6 relative">
                <input
                  type="password"
                  id="password"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="peer mt-1 block w-full rounded-md border-2 focus:ring-0 focus:border-transparent sm:text-sm pt-5 pb-3 pl-4"
                />
                <label
                  htmlFor="password"
                  className={`absolute left-4 text-sm font-medium transition-all duration-300 
                              transform -translate-y-1/2 peer-focus:top-0 
                              peer-focus:left-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:bg-white 
                              peer-focus:px-1 ${password ? "top-0 left-4 text-xs font-semibold text-blue-600 bg-white px-1" : "top-1/2 text-sm"
                  }`}
               >
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Sign in
              </button>
                {loading && <p className="mt-4 text-center text-blue-500">Registering...</p>}
                {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                {successMessage && <p className="mt-4 text-center text-green-500">{successMessage}</p>}
              {/* Botón de Google */}
              <button

                onClick={()=>dispatch(loginWithGoogle)}
                type="button"
                className="w-full mt-4 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
              >
                <img
                  src="https://e7.pngegg.com/pngimages/704/688/png-clipart-google-google-thumbnail.png"
                  alt="Google"
                  className="w-5 h-5 mr-3"
                />
                Sign in with Google
              </button>
            </form>
            <div className="text-center mt-6">
              <p className="text-gray-500 text-sm">
                Don’t have an account yet?{" "}
                <NavLink href="/signUp" className="text-blue-600 hover:underline">
                  Sign up
                </NavLink>
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Go back to{" "}
                <NavLink href="/home" className="text-blue-600 hover:underline">
                  home page
                </NavLink>
              </p>
              {loading && <p className="text-center text-teal-400">Loading...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}
              {successMessage && <p className="mt-4 text-center text-green-500">{successMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default SignInComponent;