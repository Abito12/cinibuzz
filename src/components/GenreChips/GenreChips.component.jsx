import {Badge} from 'shards-react';

const Badges = (props) => {
    const {items = [], onItemClick} = props;

    return (
        <div className="badges-box">
            {items.map((item) => (
                <div key={item.id} onClick={() => onItemClick(item.id)}>
                    <Badge
                        theme="light"
                        className="genre-chips"
                        style={{
                            backgroundColor: item.selected ? 'E9ECEF' : 'white'
                        }}>
                        {item.name}
                    </Badge>
                </div>
            ))}
        </div>
    );
};

export default Badges;
