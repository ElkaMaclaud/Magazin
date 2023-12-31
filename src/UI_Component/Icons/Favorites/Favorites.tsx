import React, { FC } from "react";

export const Favorites: FC<{
  width?: string;
  height?: string;
  like?: boolean;
}> = ({ width, height, like }) => {
  if (like) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
      >
        <path
          fill="#F8104B"
          fillRule="evenodd"
          d="M12 22c-.316-.02-.56-.147-.848-.278a23.542 23.542 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.183 6.183 0 0 1 5 2.568A6.183 6.183 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.599 23.599 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278Z"
          clipRule="evenodd"
        ></path>
      </svg>
      // <svg
      //   version="1.1"
      //   id="Capa_1"
      //   xmlns="http://www.w3.org/2000/svg"
      //   x="0px"
      //   y="0px"
      //   width="30px"
      //   height="30px"
      //   viewBox="0 0 615.433 615.433"
      // >
      //   <g>
      //     <path
      //       d="M253.193,573.177c12.128,10.043,23.367,19,33.493,26.733c6.092,4.674,10.488,7.929,12.88,9.653l8.151,5.869l8.123-5.869
      // c2.393-1.725,6.787-4.979,12.88-9.653c10.126-7.761,21.392-16.719,33.493-26.733c34.605-28.681,69.239-60.31,101.563-94.025
      // c72.217-75.304,122.706-149.912,141.762-220.766c5.396-20.057,8.179-39.613,8.179-58.641
      // c0-188.913-172.473-269.697-306.139-127.352C174.412-69.98,1.716,15.812,1.716,199.745c0,19.028,2.782,38.612,8.151,58.641
      // c19.027,70.854,69.518,145.434,141.761,220.766C183.981,512.867,218.587,544.496,253.193,573.177z"
      //       fill="red"
      //     />
      //   </g>
      // </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "24px"}
      height={height || "24px"}
    >
      <path
        d="M7 5a4 4 0 0 0-4 4c0 3.552 2.218 6.296 4.621 8.22A21.525 21.525 0 0 0 12 19.91a21.58 21.58 0 0 0 4.377-2.69C18.78 15.294 21 12.551 21 9a4 4 0 0 0-4-4c-1.957 0-3.652 1.396-4.02 3.2a1 1 0 0 1-1.96 0C10.652 6.396 8.957 5 7 5Zm5 17c-.316-.02-.56-.147-.848-.278a23.542 23.542 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.183 6.183 0 0 1 5 2.568A6.183 6.183 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.599 23.599 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278Z"
      ></path>
    </svg>
  );
};

{
  /* <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width || "50px"}
      height={height || "50px"}
      viewBox="0 0 612 612"
    >
      <g>
        <g id="_x31__39_">
          <g>
            <path
              d="M459,18.075c-63.743,0-111.977,37.409-153,76.5c-39.091-41.482-89.256-76.5-153-76.5c-89.773,0-153,77.188-153,161.358
				c0,45.154,18.494,77.686,38.747,108.228l237.781,285.077c26.699,28.248,31.729,28.248,58.427,0l238.316-285.077
				C597.082,257.119,612,224.587,612,179.433C612,95.264,548.772,18.075,459,18.075z M535.5,279.744L306,553.575L76.5,278.615
				c-27.444-38.154-38.25-63.896-38.25-99.182c0-65.752,46.952-124.944,114.75-125.499c55.769-0.459,118.977,56.495,153,99.431
				c33.125-41.444,97.231-99.431,153-99.431c66,0,114.75,59.747,114.75,125.499C573.75,214.719,565.201,242.373,535.5,279.744z"
            />
          </g>
        </g>
      </g>
    </svg> */
}
