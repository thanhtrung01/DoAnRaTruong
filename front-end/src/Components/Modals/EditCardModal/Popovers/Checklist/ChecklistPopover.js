import React, { useState } from 'react';
import { Container, Title, SearchArea, ButtonContainer, BlueButton } from '../Labels/styled';
import { useDispatch, useSelector } from 'react-redux';
import { checklistCreate } from '../../../../../Services/cardService';
const ChecklistPopover = (props) => {
	const dispatch = useDispatch();
	const thisCard = useSelector((state) => state.card);
	const [title, setTitle] = useState('');

	const handleAddClick = async () => {
		props.closeCallback();
		await checklistCreate(thisCard.cardId, thisCard.listId, thisCard.boardId, title, dispatch);
	};
	return (
		<Container>
			<Title>Tiêu đề</Title>
			<SearchArea placeholder='Việc cần làm...' value={title} onChange={(e) => setTitle(e.target.value)} />
			<ButtonContainer>
				<BlueButton style={{ width: '4rem' }} onClick={handleAddClick}>
					Thêm
				</BlueButton>
			</ButtonContainer>
		</Container>
	);
};

export default ChecklistPopover;
