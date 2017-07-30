class ContainerComponent extends React.Component {
  render() {
    const { item, i, selectedItem} = this.props;

    if (item.type === 'folder') {
      const folderType = item.private ? 'private-folder' : 'public-folder';

      if (item.children) {
        const items = item.children.map((itemJ, j) => {
          return (
            <ContainerComponent selectedItem={selectedItem} item={itemJ}
              key={`${j}-${itemJ.name}`} i={j} />);
        });

        return (
          <FolderComponent items={items} folderType={folderType} item={item}
            selectedItem={selectedItem} i={i} />);
      } else {
        return (
          <FolderComponent folderType={folderType} item={item}
            selectedItem={selectedItem} i={i} />);
      }
    } else {
      return (
        <FileComponent file={item} selectedItem={selectedItem} i={i} />);
    }
  }
}

class FolderComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      selected: false
    };
    this._handleView = this._handleView.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  _handleView() {
    const { collapsed } = this.state;

    this.setState({
      collapsed: !collapsed
    });
  }

  _onClick() {
    const { selectedItem } = this.props;

    this._handleView();
    selectedItem(this);
  }

  render() {
    const { selected, collapsed } = this.state;
    const { item, items, folderType, i } = this.props;

    return (
      <div className='parent'>
        <div onClick={this._onClick}
          className={selected ? 'selected display' : 'display'}>
          <div className={collapsed ? 'collapsed' : 'closed'} />
          <div className={folderType} />
          <div key={`${item.name}_${i}`}>{item.name}</div>
        </div>
        {items ? <div className={collapsed ? 'children' : 'close children'}>
        {items}</div> : null}
      </div>);
  }
}

class FileComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    };
  }
  render() {
    const { selected } = this.state;
    const { file, i, selectedItem } = this.props;

    return (
      <div className='parent'>
        <div onClick={selectedItem.bind(null, this)}
          className={selected ? 'selected display' : 'display'}>
          <div className={file.type} />
          <div key={`${file.type}_${i}`} title={file.name}>{file.name}</div>
        </div>
      </div>);
  }
}

class TitleComponent extends React.Component {
  render() {
    return <div className='label'>Label</div>;
  }
}

class HeaderComponent extends React.Component {
  render() {
    const { title, label } = this.props;

    return (
      <section className='header'>
        <div className='main-header'>
          <div className='title'>{ title }</div>
          <div className='close-btn' />
        </div>
        <TitleComponent />
      </section>);
  }
}

class FooterComponent extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <section className='footer'>
        <div className='link'>Link</div>
        <div className='btn'>Done</div>
      </section>);
  }
}

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSelectedItem: null,
      items: null
    };
    this.selectedItem = this.selectedItem.bind(this);
  }

  componentWillMount() {
    const items = data.children.map((item, i) => {
      return (
        <ContainerComponent selectedItem={this.selectedItem}
          key={`${item.name}-${i}`} item={item} i={i} />);
    });

    this.setState({ items });
  }

  selectedItem(item) {
    if (this.state.currentSelectedItem) {
      this.state.currentSelectedItem.setState({ selected: false });
    }
    item.setState({ selected: true });
    this.setState({ currentSelectedItem: item });
  }

  render() {
    const title = 'Title';
    const { items } = this.state;

    return (
      <section className='site-wrap'>
        <HeaderComponent title={title} />
        <section className='file-structure'>{items}</section>
        <FooterComponent />
      </section>);
  }
}

ReactDOM.render(
  <AppComponent />,
  document.getElementById('application')
)
