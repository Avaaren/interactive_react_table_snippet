import React, {Component} from 'react'






class ProductRow extends Component {
    render() {
        const {product} = this.props;
        const name = product.stocked ? <span style={{color:'red'}}>{product.name}</span> : product.name;

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
            </tr>

        );
    }
}

class ProductTable extends Component {
    render() {
        const {products, filterText, isStockOnly} = this.props;

        const rows = [];

        products.forEach( (product) => {
            if (product.name.indexOf(filterText)===-1){
                return;
            }
            if (isStockOnly && !product.stocked){
                return;
            }

            rows.push(<ProductRow key={product.id} product={product}/>)
        });

        return (
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Category</td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

class SearchBox extends Component {
    onFilterTextChange = (e) => {
        this.props.onFilterTextChange(e.target.value);
    }

    onStockOnlyChange = (e) => {
        this.props.onStockOnlyChange(e.target.checked);
    }
    render() {
        const {filterText} = this.props;
        const {isStockOnly} = this.props;

        return (
            <form>
                <input type="text" placeholder="Search"
                value={filterText} onChange={this.onFilterTextChange}/>

                <input type="checkbox" checked={isStockOnly} onChange={this.onStockOnlyChange}/>
            </form>
        );
    }
}

class TableWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            isStockOnly: false
        };
    }
    onFilterTextChange = (filterText) => {
        this.setState({filterText:filterText});
    }
    onStockOnlyChange = (isStockOnly) => {
        this.setState({isStockOnly: isStockOnly});
    }

    render() {
        return(
            <div className="TableWrapper">
                <SearchBox 
                filterText={this.state.filterText} 
                isStockOnly={this.state.isStockOnly}
                onFilterTextChange = {this.onFilterTextChange}
                onStockOnlyChange = {this.onStockOnlyChange}/>

                <ProductTable products={this.props.products}
                filterText = {this.state.filterText}
                isStockOnly = {this.state.isStockOnly}/>
            </div>
        );
    }
}

export default TableWrapper

