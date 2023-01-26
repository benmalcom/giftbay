import { useRouter } from 'next/router';

function useIsPDFGeneratePage() {
  const router = useRouter();
  return router.pathname === '/resume/builder' && router.query.generatePDF;
}
export default useIsPDFGeneratePage;
