import { useEffect, useRef } from 'react';
import { BreadcrumbRoute } from '~/const/route/types';
import View from '../../components/Material/View';
import LayoutBreadcrumbs from '../Breadcrumbs';
import LayoutToolbar from '../Toolbar';
import { useTranslation } from 'react-i18next';

type Props = {
  title?: string;
  breadcrumbs?: {
    shown?: boolean;
    title?: string;
    loading?: boolean;
    lastItems?: BreadcrumbRoute[];
    leftComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
    bottomComponent?: React.ReactNode;
  };
  children: React.ReactNode;
};

export default function LayoutWrapper(props: Props) {
  const { title = '', breadcrumbs, children } = props;
  const {
    title: breadcrumbsTitle,
    lastItems: breadcrumbsLastItems,
    leftComponent: breadcrumbsLeftComponent,
    rightComponent: breadcrumbsRightComponent,
    bottomComponent: breadcrumbsBottomComponent,
    loading: breadcrumbsLoading
  } = breadcrumbs || {};

  const { t } = useTranslation();

  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.title = `${title ? `${title} | ` : ''}${t('app.title')}`;
  }, [t, title]);

  return (
    <View flexGrow={1}>
      <View flexGrow={1} style={{ height: boxRef.current?.clientHeight || 200 }}>
        {breadcrumbs && (
          <LayoutBreadcrumbs
            title={breadcrumbsTitle}
            loading={breadcrumbsLoading}
            lastItems={breadcrumbsLastItems}
            leftComponent={breadcrumbsLeftComponent}
            rightComponent={breadcrumbsRightComponent}
            bottomComponent={breadcrumbsBottomComponent}
          />
        )}
        <View flexGrow={1}>
          <LayoutToolbar />
          <View flexGrow={1}>{children}</View>
        </View>
      </View>
    </View>
  );
}
