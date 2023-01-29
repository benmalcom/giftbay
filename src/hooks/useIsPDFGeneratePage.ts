import { useRouter } from 'next/router';

function useIsPDFGeneratePage() {
  const router = useRouter();
  return (
    router.pathname.startsWith('/builder') &&
    router.query.resumeId &&
    router.query.generatePDF
  );
}
export default useIsPDFGeneratePage;
