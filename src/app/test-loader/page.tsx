"use client";

import { motion } from "framer-motion";

export default function TestLoader() {
  return (
    <div className="fixed inset-0 h-screen w-full">
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[70%] scale-[.5]"
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 640 640"
          width="640"
          height="640"
        >
          <defs>
            <motion.path
              d="M14.85 304.75L105.01 400.84L195.17 496.94C198.71 493.18 200.67 491.08 201.06 490.66C204.37 487.14 206.95 484.08 206.88 483.85C206.74 483.54 203.43 480.79 199.48 477.65C158.89 445.41 130.8 396.71 122.18 343.49C118.8 322.51 118.52 294.41 121.46 274.5C127.57 233.84 143.88 196.47 168.81 166.38C178.94 154.13 193.52 140.04 204.73 131.84C205.07 131.59 206.77 130.34 209.83 128.09L202.5 120.36L195.17 112.55L105.01 208.65L14.85 304.75Z"
              id="eARyF80ZN"
              animate={{
                opacity: [0.3, 1.2, 0.3],
                scale: [0.8, 1, 0.8],
                transition: { duration: 2, repeat: Infinity },
              }}
            ></motion.path>
            <motion.path
              d="M430.53 128.78C445.91 139.73 464.87 158.11 476.01 173.04C496.05 199.84 510.21 232.15 516.24 264.85C519.33 281.39 519.83 288.13 519.83 307.81C519.83 323.2 519.54 328.56 518.18 337.6C514.95 360.26 508.98 380.17 499.43 400.92C484.77 432.62 463.72 459.35 437.43 479.71C437.11 479.97 435.5 481.22 432.61 483.47C436.36 487.51 438.45 489.76 438.86 490.21C442.31 493.88 445.19 496.79 445.26 496.71C447.49 494.72 625.15 305.05 625.15 304.82C625.15 304.52 584.63 261.18 535.13 208.42C529.14 202.03 499.16 170.07 445.19 112.55L437.64 120.59C432.76 126 430.39 128.73 430.53 128.78Z"
              id="a2EeRyDGxq"
              animate={{
                opacity: [0.3, 1.2, 0.3],
                scale: [0.8, 1, 0.8],
                transition: { duration: 2, repeat: Infinity },
              }}
            ></motion.path>
            <path
              d="M224.56 153.51C224.44 153.77 223.87 155.05 222.83 157.34L222.83 224.34L222.83 291.35C223.87 293.64 224.44 294.92 224.56 295.17C226.57 299.85 230.16 302.91 234.83 304.06C241.3 305.66 248.77 301.91 252.07 295.4C253.15 293.26 253.44 290.04 253.8 273.73C254.37 253.44 255.02 248.23 258.39 238.13C267.02 212.71 284.26 193.56 308.04 183.15C318.31 178.63 325.35 177.33 339.22 177.25C352.29 177.25 354.59 177.63 365.44 181.23C389.44 189.2 409.98 209.64 418.96 234.6C424.86 250.91 426.08 264.24 423.63 286.06C423.13 290.2 423.35 291.27 424.93 295.1C427.08 300.07 431.54 303.6 436.64 304.44C442.53 305.36 449.5 301.38 452.44 295.4C455.39 289.35 456.54 264.32 454.53 250C450.72 223.04 439.22 198.92 421.19 179.93C389.44 146.55 343.89 135.52 301.14 150.83C285.26 156.58 268.02 168.14 257.32 180.24C255.95 181.77 254.59 182.99 254.37 182.99C254.08 182.99 253.72 176.87 253.58 169.36C253.37 156.58 253.29 155.66 251.57 152.37C247.98 145.47 239.5 142.26 232.53 145.09C228.72 146.7 226.57 148.92 224.56 153.51Z"
              id="lhTw90VLL"
            ></path>
            <motion.path
              d="M260.19 267.99C260.19 314.62 295.47 352.22 339.22 352.22C352.87 352.22 362.93 349.62 375.64 342.88C388.36 336.14 404.67 319.83 404.81 313.55C404.95 307.89 402.01 305.28 395.69 305.43C390.01 305.59 385.77 307.73 377.44 314.93C364.72 325.88 354.52 329.94 339.79 330.01C327.22 330.01 317.02 326.88 307.1 319.83C289.86 307.58 280.16 287.06 281.24 264.93C281.74 254.67 283.04 249.54 287.49 239.97C295.39 223.04 310.48 210.79 327.94 207.04C337.06 205.05 348.41 205.81 357.39 209.03C365.8 212.02 370.97 215.23 378.8 222.35C385.63 228.56 390.95 231.16 396.69 231.24C399.78 231.24 401.08 230.85 402.8 229.4C404.67 227.79 404.95 227.02 404.95 223.81C404.95 220.59 404.6 219.52 402.37 216.61C390.8 201.68 377.44 192.03 361.13 186.9C350.78 183.68 336.34 182.92 325.57 184.99C287.63 192.34 260.19 227.18 260.19 267.99Z"
              id="a25j1WeTpz"
              initial={{
                scale: 0.6,
              }}
            ></motion.path>
            <path
              d="M336.34 228.56C336.34 242.49 336.42 243.56 337.78 245.02C339.65 247.01 341.37 246.93 343.46 244.94C345.04 243.41 345.04 243.03 344.82 228.02C344.61 213.93 344.46 212.63 343.24 211.63C341.3 210.18 339.51 210.25 337.78 212.09C336.42 213.55 336.34 214.62 336.34 228.56Z"
              id="i1EngW1BI"
            ></path>
            <path
              d="M293.96 267.99C293.96 290.2 308.61 310.18 328.94 315.85C334.33 317.38 346.04 317.3 351.72 315.77C367.02 311.64 380.31 298.01 384.77 281.93C389.08 266.15 385.13 247.7 374.78 235.29C369.03 228.4 358.18 221.28 353.51 221.28C351.36 221.28 348.56 224.65 348.56 227.33C348.56 231.08 349.2 231.92 354.95 235.06C363.21 239.66 369.1 246.4 372.34 255.05C374.21 260.18 374.92 269.98 373.77 275.65C369.54 296.86 348.27 309.57 329.02 302.53C304.88 293.64 298.27 260.41 316.95 241.5C318.53 239.81 322.33 237.06 325.35 235.29C328.3 233.61 331.1 231.7 331.39 231.08C331.75 230.55 332.03 228.79 332.03 227.25C332.03 225.11 331.6 224.04 330.17 222.89C327.44 220.59 325.78 220.82 319.03 224.5C304.09 232.38 293.96 249.92 293.96 267.99Z"
              id="b4LTseSfn4"
            ></path>
            <path
              d="M344.18 258.19C343.74 261.48 343.1 264.16 342.88 264.16C342.59 264.16 341.8 261.64 341.09 258.57C340.37 255.59 339.36 252.29 338.79 251.3C337.64 249.38 334.84 249 333.54 250.61C332.68 251.76 328.66 272.59 327.94 279.63C327.58 283.84 327.58 284.07 329.45 284.91C332.25 286.29 333.83 284.3 334.91 278.1C336.27 269.45 336.42 269.06 336.99 270.29C337.28 270.9 338.14 273.81 338.86 276.8C340.22 282.62 341.59 284.84 343.6 284.84C345.9 284.84 346.91 281.77 349.64 266.84C351.65 255.74 352.08 251.99 351.5 250.61C350.5 248.31 347.48 248.23 346.12 250.53C345.54 251.53 344.68 254.97 344.18 258.19Z"
              id="bO4SVksC1"
            ></path>
            <path
              d="M223.91 341.88C222.98 345.79 222.83 354.9 222.83 405.29C222.83 449.7 223.05 465.01 223.69 467.39C225.49 473.59 232.17 478.57 238.71 478.57C242.23 478.57 248.05 475.43 250.2 472.36C253.72 467.39 253.72 467.77 253.72 412.64C253.72 366.46 253.87 360.64 254.87 359.57C256.89 357.35 259.11 358.19 264.57 363.09C279.3 376.19 298.05 385.84 316.8 389.82C326.21 391.81 342.59 392.5 352.15 391.35C380.53 387.9 406.46 373.74 425.57 351.46C428.45 348.01 431.61 343.72 432.54 341.81C436.57 333.77 433.62 323.97 425.79 319.45C422.77 317.69 414.73 317.76 412.21 319.6C411.13 320.29 406.32 325.11 401.51 330.32C389.51 343.19 380.24 349.69 366.66 354.52C349.64 360.57 329.02 360.72 312.71 354.82C299.27 349.92 289.36 343.26 277.07 330.78C272.69 326.34 267.66 321.97 265.87 321.06C259.76 317.84 252.29 317.07 245.46 318.84C234.83 321.67 226.78 330.32 223.91 341.88Z"
              id="cqmzeho9b"
            ></path>
          </defs>
          <g>
            <g>
              <g>
                <use
                  xlinkHref="#eARyF80ZN"
                  opacity="1"
                  fill="#4a4a4c"
                  fillOpacity="1"
                ></use>
                <g>
                  <use
                    xlinkHref="#eARyF80ZN"
                    opacity="1"
                    fillOpacity="0"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeOpacity="0"
                  ></use>
                </g>
              </g>
              <g>
                <use
                  xlinkHref="#a2EeRyDGxq"
                  opacity="1"
                  fill="#4a4a4c"
                  fillOpacity="1"
                ></use>
                <g>
                  <use
                    xlinkHref="#a2EeRyDGxq"
                    opacity="1"
                    fillOpacity="0"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeOpacity="0"
                  ></use>
                </g>
              </g>
              <g>
                <motion.use
                  xlinkHref="#lhTw90VLL"
                  opacity="1"
                  fill="#02aca6"
                  fillOpacity="1"
                  animate={{
                    fillOpacity: [0, 0.3, 0],
                    transition: { duration: 2, repeat: Infinity },
                  }}
                ></motion.use>
                <g>
                  <motion.use
                    xlinkHref="#lhTw90VLL"
                    opacity="1"
                    fillOpacity="0"
                    stroke="#02aca6"
                    strokeWidth="5"
                    strokeOpacity=".8"
                    strokeDasharray={10}
                    animate={{
                      strokeDashoffset: [0, 100, 0],
                      transition: { duration: 2, repeat: Infinity },
                    }}
                  ></motion.use>
                </g>
              </g>
              <g>
                <motion.use
                  xlinkHref="#a25j1WeTpz"
                  opacity="1"
                  fill="#02aca6"
                  animate={{
                    fillOpacity: [0, 0, 0],
                    transition: { duration: 2, repeat: Infinity },
                  }}
                ></motion.use>
                <g>
                  <motion.use
                    xlinkHref="#a25j1WeTpz"
                    opacity="1"
                    fillOpacity="0"
                    stroke="#02aca6"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeOpacity=".8"
                    strokeDasharray={10}
                    animate={{
                      strokeDashoffset: [0, 100, 0],
                      transition: { duration: 2, repeat: Infinity },
                    }}
                  ></motion.use>
                </g>
              </g>
              <g>
                <use
                  xlinkHref="#i1EngW1BI"
                  opacity="1"
                  fill="#02aca6"
                  fillOpacity="0"
                ></use>
                <g>
                  <use
                    xlinkHref="#i1EngW1BI"
                    opacity="1"
                    fillOpacity="0"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeOpacity="0"
                  ></use>
                </g>
              </g>
              <g>
                <motion.use
                  xlinkHref="#b4LTseSfn4"
                  opacity="1"
                  fill="#02aca6"
                  fillOpacity="1"
                  animate={{
                    fillOpacity: [0, 0.3, 0],
                    transition: { duration: 2, repeat: Infinity },
                  }}
                ></motion.use>
                <g>
                  <use
                    xlinkHref="#b4LTseSfn4"
                    opacity="1"
                    fillOpacity="0"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeOpacity="0"
                  ></use>
                </g>
              </g>
              <g>
                <motion.use
                  xlinkHref="#bO4SVksC1"
                  opacity="1"
                  fill="#02aca6"
                  fillOpacity="1"
                  animate={{
                    rotate: [0, 360],
                    scale: [0.6, 1.2, 0.6],
                    opacity: [0.3, 0.6, 0.3],
                    transition: { duration: 2, repeat: Infinity },
                  }}
                ></motion.use>
                <g>
                  <use
                    xlinkHref="#bO4SVksC1"
                    opacity="1"
                    fillOpacity="0"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeOpacity="0"
                  ></use>
                </g>
              </g>
              <g>
                <motion.use
                  xlinkHref="#cqmzeho9b"
                  opacity="1"
                  fill="#02aca6"
                  fillOpacity="1"
                  animate={{
                    fillOpacity: [0, 0.3, 0],
                    transition: { delay: 0.2, duration: 2, repeat: Infinity },
                  }}
                ></motion.use>
                <g>
                  <motion.use
                    xlinkHref="#cqmzeho9b"
                    opacity="1"
                    fillOpacity="0"
                    stroke="#02aca6"
                    strokeWidth="5"
                    strokeOpacity=".8"
                    strokeDasharray={10}
                    animate={{
                      strokeDashoffset: [0, 100, 0],
                      transition: { duration: 2, repeat: Infinity },
                    }}
                  ></motion.use>
                </g>
              </g>
            </g>
          </g>
        </motion.svg>
      </motion.div>
    </div>
  );
}