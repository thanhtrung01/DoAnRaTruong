// ----------------------------------------------------------------------

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M7 17h2v-5H7v5Zm8 0h2V7h-2v10Zm-4 0h2v-3h-2v3Zm0-5h2v-2h-2v2Zm-6 9q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Z"
        />
      </svg>
    ),
  },
  {
    title: "user",
    path: "/dashboard/user",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
        />
      </svg>
    ),
  },
  {
    title: "board",
    path: "/dashboard/board",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm0 6h8m0 3h8m-8-6h8m-8-5v16"
        />
      </svg>
    ),
  },
  {
    title: "login",
    path: "/login/admin",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M11.25 19a.75.75 0 0 1 .75-.75h6a.25.25 0 0 0 .25-.25V6a.25.25 0 0 0-.25-.25h-6a.75.75 0 0 1 0-1.5h6c.966 0 1.75.784 1.75 1.75v12A1.75 1.75 0 0 1 18 19.75h-6a.75.75 0 0 1-.75-.75Z"
        />
        <path
          fill="currentColor"
          d="M3.5 13.115a1 1 0 0 0 1 1h4.856c.023.356.052.71.086 1.066l.03.305a.718.718 0 0 0 1.025.578a16.844 16.844 0 0 0 4.884-3.539l.03-.031a.721.721 0 0 0 0-.998l-.03-.031a16.842 16.842 0 0 0-4.884-3.539a.718.718 0 0 0-1.025.578l-.03.305c-.034.355-.063.71-.086 1.066H4.5a1 1 0 0 0-1 1v2.24Z"
        />
      </svg>
    ),
  },
  {
    title: "Not found",
    path: "/404",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12 8v4m0 4.01l.01-.011M9 3H4v3m0 5v2m16-2v2M15 3h5v3M9 21H4v-3m11 3h5v-3"
        />
      </svg>
    ),
  },
];

export default navConfig;
