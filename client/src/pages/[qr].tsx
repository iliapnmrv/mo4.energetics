import React from "react";
import { useRouter } from "next/router";

type Props = {};

export default function Qr({}: Props) {
  const router = useRouter();
  const { qr } = router.query;

  return <p>QR: {qr}</p>;
}
