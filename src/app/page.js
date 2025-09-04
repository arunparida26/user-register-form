// import Image from "next/image";
// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol>
//           <li>
//             Get started by editing <code>src/app/page.js</code>.
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.secondary}
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

"use client";

import { useDispatch } from "react-redux";
import { Container, Box } from "@mui/material";
import DynamicForm from "./components/DynamicForm";
import UsersTable from "./components/UsersTable";
import { addUser } from "../store/userSlice";

// JSON Configuration
const formConfig = {
  title: "User Registration Form",
  fields: [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
      validation: { minLength: 3, maxLength: 50 },
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      validation: { pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$" },
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter a secure password",
      required: true,
      validation: { minLength: 8, maxLength: 20 },
    },
    {
      id: "gender",
      label: "Gender",
      type: "select",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
      required: true,
    },
    {
      id: "dob",
      label: "Date of Birth",
      type: "date",
      required: true,
      validation: { min: "1900-01-01", max: "2025-12-31" },
    },
  ],
};

export default function Home() {
  const dispatch = useDispatch();

  const handleFormSubmit = (formData) => {
    const user = {
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      dob: formData.dob,
    };

    // Dispatch action to add user to Redux store
    dispatch(addUser(user));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <DynamicForm formConfig={formConfig} onSubmit={handleFormSubmit} />
        <UsersTable />
      </Box>
    </Container>
  );
}
