import { cards_list, datatable, chart } from '.';

const COMPONENT_TYPE_MAP = {
  datatable: datatable,
  cards_list: cards_list,
  chart: chart,
};

export default function RenderComponents({ components }) {
  if (components.length === 0) {
    return (
      <div>
        No component is added to the page. If your are the admin, please add
        one.
      </div>
    );
  }

  const buildComponent = (component) => {
    let PageComponent = COMPONENT_TYPE_MAP[component.component_type];
    return <PageComponent component={component} key={component.id} />;
  };
  return components.map((component) => buildComponent(component));
}
