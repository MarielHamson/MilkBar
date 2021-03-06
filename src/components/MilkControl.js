import React from 'react';
import NewMilkForm from './NewMilkForm';
import MilkList from './MilkList';
import MilkDetail from './MilkDetail';
import EditMilkForm from './EditMilkForm';
import Button from 'react-bootstrap/Button';

class MilkControl extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formVisibleOnPage: false,
			mainMilkList: [],
			selectedMilk: null,
			editing: false,
		};
	}

	handleClick = () => {
		if (this.state.selectedMilk != null) {
			this.setState({
				formVisibleOnPage: false,
				selectedMilk: null,
				editing: false,
			});
		} else {
			this.setState((prevState) => ({
				formVisibleOnPage: !prevState.formVisibleOnPage,
			}));
		}
	};

	handleEditClick = () => {
		this.setState({ editing: true });
	};

	handleSellClick = () => {
		this.setState({
			editing: false,
			selectedMilk: null,
		});
	};

	handleEditingMilkInList = (milkToEdit) => {
		const editedMainMilkList = this.state.mainMilkList
			.filter((milk) => milk.id !== this.state.selectedMilk.id)
			.concat(milkToEdit);
		this.setState({
			mainMilkList: editedMainMilkList,
			editing: false,
			selectedMilk: null,
		});
	};

	handleSellingMilk = (id) => {
		const soldMilk = this.state.mainMilkList.filter(
			(milk) => milk.id === id
		)[0];
		if (soldMilk.remaining > 0) {
			soldMilk.remaining--;
		}
		const editedMilkList = this.state.mainMilkList
			.filter((milk) => milk.id !== id)
			.concat(soldMilk);
		this.setState({
			mainMilkList: editedMilkList,
			editing: false,
		});
	};

	handleChangingSelectedMilk = (id) => {
		const selectedMilk = this.state.mainMilkList.filter(
			(milk) => milk.id === id
		)[0];
		this.setState({ selectedMilk: selectedMilk });
	};

	handleAddingNewMilkToList = (newMilk) => {
		const newMainMilkList = this.state.mainMilkList.concat(newMilk);
		this.setState({
			mainMilkList: newMainMilkList,
			formVisibleOnPage: false,
		});
	};

	handleDeletingMilk = (id) => {
		const newMainMilkList = this.state.mainMilkList.filter(
			(milk) => milk.id !== id
		);
		this.setState({
			mainMilkList: newMainMilkList,
			selectedMilk: null,
		});
	};

	render() {
		let currentlyVisibleState = null;
		let buttonText = null;

		if (this.state.editing) {
			currentlyVisibleState = (
				<EditMilkForm
					milk={this.state.selectedMilk}
					onEditMilk={this.handleEditingMilkInList}
					onSellMilk={this.handleSellingMilk}
				/>
			);
			buttonText = 'Return to Milk List';
		} else if (this.state.selectedMilk != null) {
			currentlyVisibleState = (
				<MilkDetail
					milk={this.state.selectedMilk}
					onClickingDelete={this.handleDeletingMilk}
					onClickingEdit={this.handleEditClick}
					onClickingSell={this.handleSellingMilk}
				/>
			);
			buttonText = 'Return to Milk List';
		} else if (this.state.formVisibleOnPage) {
			currentlyVisibleState = (
				<NewMilkForm onNewMilkCreation={this.handleAddingNewMilkToList} />
			);
			buttonText = 'Return to Milk List';
		} else {
			currentlyVisibleState = (
				<MilkList
					milkList={this.state.mainMilkList}
					onMilkSelection={this.handleChangingSelectedMilk}
				/>
			);
			buttonText = 'Add Milk';
		}

		return (
			<React.Fragment>
				{currentlyVisibleState}
				<Button variant="outline-success" onClick={this.handleClick}>
					{buttonText}
				</Button>
			</React.Fragment>
		);
	}
}

export default MilkControl;
