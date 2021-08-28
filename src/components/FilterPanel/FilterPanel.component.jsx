import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    FormInput,
    Button,
    Container
} from 'shards-react';
import {useState} from 'react';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const FilterPanel = (props) => {
    const {updateFilters} = props;
    const [searchKey, setSearchKey] = useState('');
    const [searchInFocus, setSearchInFocus] = useState(false);

    const handleSearch = () => {
        updateFilters({searchKey});
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Container fluid>
            <Row>
                <Card className="search-bar-box">
                    <div
                        className="search-box-body"
                        onKeyPress={handleKeyPress}>
                        <CardBody>
                            <CardTitle className="search-box-title">
                                Find perfect movie for <strong>evening</strong>
                            </CardTitle>
                            <Row className="search-input">
                                <Col lg="9" md="9" sm="9" xs="8">
                                    <InputGroup>
                                        <InputGroupAddon type="prepend">
                                            <InputGroupText
                                                className={
                                                    searchInFocus
                                                        ? 'focus-addon'
                                                        : ''
                                                }>
                                                <FontAwesomeIcon
                                                    icon={faSearch}
                                                />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <FormInput
                                            onFocus={() =>
                                                setSearchInFocus(true)
                                            }
                                            onBlur={() =>
                                                setSearchInFocus(false)
                                            }
                                            value={searchKey}
                                            onChange={(event) => {
                                                const {value} = event.target;
                                                setSearchKey(value);
                                                if (!value.length) {
                                                    updateFilters({
                                                        searchKey: ''
                                                    });
                                                }
                                            }}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col lg="3" md="3" sm="3" xs="4">
                                    <Button
                                        disabled={!searchKey.length}
                                        onClick={handleSearch}>
                                        SEARCH
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </div>
                </Card>
            </Row>
        </Container>
    );
};

export default FilterPanel;
