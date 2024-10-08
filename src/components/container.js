import React from 'react';
import ImageSwitch from './imageswitch';
import BlogWrite from './blogwrite';
import BlogList from './bloglist';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPen } from '@fortawesome/free-solid-svg-icons';

class Container extends React.Component {

    state = {
        followlist: [],
        listgroup:[],
        check: '',
        group: null
    }

    fetchFollow = async () => {
        try {
            const response = await axios.get('http://localhost:8080/webblogvan/src/php/followlist.php',
                { withCredentials: true }
            );
            this.setState(
              {followlist: response.data}
            )
            console.log(response.data);
          } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
          }
    }

    fetchGroup = async () => {
        try {
            const response = await axios.get('http://localhost:8080/webblogvan/src/php/groupusers.php',
                { withCredentials: true }
            );
            this.setState(
              {listgroup: response.data}
            )
            console.log(response.data);
          } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
          }
    }

    handleChangeBloglistAll = (event, followed, group_id) => {
        event.preventDefault();
        this.setState(
            {
                check: followed,
                group: group_id
            }
        )
    }

    handleChangeBloglist = (event, followed) => {
        event.preventDefault();
        console.log(followed);
        this.setState(
            {
                check: followed,
                group: null
            }
        )
    }

    handleChangeListByGroup = (event, group_id) => {
        event.preventDefault();
        this.setState(
            {
                group: group_id,
                check: ''
            }
        )
    }

    componentDidMount () {
        this.fetchFollow();
        this.fetchGroup();
    }

    render() {

        let {followlist} = this.state;
        let {listgroup} = this.state;
        console.log(">>", followlist);
        return (
            <>
                <div className='news'>
                    <ImageSwitch/>
                </div>
                <div className='grid blog-write'>
                    <BlogWrite username={this.props.username}/>
                </div>
                <div className='grid container'>
                    <div className='blog-list'>
                        <BlogList username={this.props.username} profile = {false} followlistchange ={this.state.check} group = {this.state.group} />
                    </div>
                    <div className='change-box'>
                        <div className='followlist-item all-list'>
                            <button onClick={(e) => this.handleChangeBloglistAll(e, '', null)} className='changeblogshow-btn'>Public</button>
                        </div>
                    <div className='followlist'>
                            <div className='follow-item'><span className='bars-icon'><FontAwesomeIcon icon={faBars} /></span>Group</div>
                            {
                                listgroup && listgroup.length > 0 &&
                                    listgroup.map((item, index) =>
                                        this.props.username === item.MEMBERS ? 
                                            <div className='followlist-item' key={index}>
                                                <button onClick={(e) => this.handleChangeListByGroup(e, item.GROUP_ID)} className='changeblogshow-btn'>{item.GROUP_NAME}</button>
                                            </div>
                                        :
                                        <div></div>
                                    )
                            }
                        </div>
                        <div className='followlist'>
                            <div className='follow-item'><span className='bars-icon'><FontAwesomeIcon icon={faBars} /></span>Following</div>
                            {
                                followlist && followlist.length > 0 &&
                                    followlist.map((item, index) =>
                                        this.props.username === item.FOLLOWER ? 
                                            <div className='followlist-item' key={index}>
                                                <button onClick={(e) => this.handleChangeBloglist(e, item.BE_FOLLOWED)} className='changeblogshow-btn'>{item.BE_FOLLOWED}</button>
                                            </div>
                                        :
                                        <div></div>
                                    )
                            }
                        </div>
                        
                    </div>
                </div>
            </>
        )
    }
}

export default Container;