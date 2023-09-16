/* eslint-disable import/no-cycle */
import { matchPath } from 'react-router-dom';
import SidebarNavList from './sidebar-nav-list';
import SidebarNavListItem from './sidebar-nav-list-Item';

const reduceChildRoutes = (props) => {
  const { items, page, depth, currentRoute } = props;
  if (page.children) {
    const open = page.href
      ? !!matchPath(
          {
            path: page.href,
            end: false,
          },
          currentRoute
        )
      : false;

    items.push(
      <SidebarNavListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        badge={page.badge}
        open={!!open}
        title={page.title}
        href={page.href}
      >
        <SidebarNavList depth={depth + 1} pages={page.children} />
      </SidebarNavListItem>
    );
  } else if (page?.href)
    items.push(
      <SidebarNavListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        badge={page.badge}
        title={page.title}
      />
    );

  return items;
};

export default reduceChildRoutes;
