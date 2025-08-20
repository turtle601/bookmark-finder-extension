import Spacer from '@/v3/shared/ui/layout/spacer';
import Divider from '@/v3/shared/ui/layout/divider';

interface IPanelLayoutProps {
  topArticle: React.ReactNode;
  bottomArticle: React.ReactNode;
}

function PanelLayout({ topArticle, bottomArticle }: IPanelLayoutProps) {
  return (
    <article>
      <Spacer direction="vertical" space="12px" />
      {topArticle}
      <Divider />
      <Spacer direction="vertical" space={'12px'} />
      {bottomArticle}
    </article>
  );
}

export default PanelLayout;
