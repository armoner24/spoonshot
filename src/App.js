import React, { Component } from 'react';
import axios from 'axios';
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: column;
flex: 1;
height: 100%;
padding: 32px;
`;

const HeaderWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

const Header = styled.div`
font-family: Baloo Bhai;
font-style: normal;
font-weight: normal;
font-size: 36px;
line-height: 57px;
color: #6855D6;
`;

const PageTypeWrapper = styled.div`
display: flex;
`;

const PageType = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 19px;
color: #000000;
cursor: pointer;
margin-left: 46px;
`;

const SearchArea = styled.div`
left: 178px;
top: 140px;
display: flex;
flex-direction: column;
align-items: center;
background: #F2F1F8;
border-radius: 16px;
margin-top: 70px;
`;

const SearchText = styled.div`
font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 40px;
line-height: 48px;
color: #000000;
margin-top: 100px;
`;

const SearchWrapper = styled.div`
display: flex;
align-items: center;
margin: 70px 92px 101px;
`;

const Input = styled.input`
width: 716px;
height: 56px;
`;

const Button = styled.button`
width: 166px;
height: 56px;
margin-left: 20px;
background: rgba(104, 85, 214, 0.54);
border-radius: 12px;
`;

const Browse = styled.div`
font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 40px;
line-height: 48px;
color: #000000;
margin-top: 137px;
`;

const NotSelected = styled.div`
font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 24px;
color: #000000;
margin-right: 36px; 
cursor: pointer;
`;

const Selected = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 24px;
color: #000000;
cursor: pointer;
`;

const SelectedWrapper = styled.div`
background: #F7F7F7;
border-radius: 8px;
padding: 16px;
margin-right: 36px;
`;

const CategoryWrapper = styled.div`
display: flex;
align-items: center;
margin-top: 20px;
`;

const Title = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 24px;
color: #000000;
margin-top: 16px;
width: 256px;
word-break: break-word;
`;

const Date = styled.div`
font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 19px;
color: #888888;
margin-top: 8px;
`;

const Image = styled.img`
width: 256px;
height: 380px;
border-radius: 16px;
`;

const TitleWrapper = styled.div`
display: flex;
flex-direction: column;
margin: 0 20px 20px 0;
cursor: pointer;
`;

const AllTitles = styled.div`
display: flex;
flex-wrap: wrap;
margin-top: 72px;
`;

const Results = styled.div`
font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 40px;
line-height: 48px;
color: #000000;
margin-top: 40px;
`;

const MovieData = styled.div``;


const categories = ['New releases', 'Upcoming', 'Action', 'Comedy', 'Crime', 'Drama', 'Thriller', 'Sci-fi', 'Family', 'Horror']

class App extends Component {
  state={
    currentCategory: 'New releases',
    titles:[],
    searchText: '',
    titleSelected: false,
    titleData: {},
    currentType: 'movie'
  }

  componentDidMount(){
    axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=239f116a0074259d404ae1d00c9558ee')
      .then(({data})=>this.setState({titles: data.results}))
  }

  changeType = type => {
    this.setState({currentType: type, titleSelected: false})
    axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=239f116a0074259d404ae1d00c9558ee')
      .then(({data})=>this.setState({titles: data.results}))
  }

  onChange = e => {
    this.setState({searchText: e.target.value})
    axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=239f116a0074259d404ae1d00c9558ee')
      .then(({data})=>this.setState({titles: data.results}))
  }

  search = () => {
    axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=239f116a0074259d404ae1d00c9558ee')
      .then(({data})=>this.setState({titles: data.results}))
  }

  selectMovie = id => {
    this.setState({titleSelected: true})
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=239f116a0074259d404ae1d00c9558ee`)
      .then(({data})=>this.setState({titleData: data}))
  }

  goBack = () => {
    this.setState({titleSelected: false})
  }

  changeCategory = category =>{
    this.setState({currentCategory: category})
    axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=239f116a0074259d404ae1d00c9558ee')
      .then(({data})=>this.setState({titles: data.results}))
  }

  render(){
    const {currentCategory, titles, searchText, titleSelected, titleData, currentType} = this.state;
    return(
      <Container>
          <HeaderWrapper>
            <Header>Cinibuzz</Header>
            <PageTypeWrapper>
              <PageType onClick={()=>this.changeType('movie')}>Movies</PageType>
              <PageType onClick={()=>this.changeType('tv show')}>TV Shows</PageType>
              <PageType onClick={()=>this.changeType('kids show')}>Kids</PageType>
            </PageTypeWrapper>
          </HeaderWrapper>
          {titleSelected ?
          <MovieData onClick={()=>this.goBack()}>{`${titleData.title}--------${titleData.tagline}-------${titleData.overview}`}</MovieData> :
          <div>
          <SearchArea>
            <SearchText>{`Find perfect ${currentType} for evening`}</SearchText>
              <SearchWrapper>
                <Input placeholder="Search movies" onChange={this.onChange}/>
                <Button onClick={this.search}>Search</Button>
              </SearchWrapper>
          </SearchArea>
          {searchText ?
          <Results>{`Showing results for ${searchText}`}</Results> :
          <div>
          <Browse>Browse movies by category</Browse>
          <CategoryWrapper>
          {categories.map(item=>(
            item===currentCategory ? <SelectedWrapper>
              <Selected onClick={()=>{this.changeCategory(item)}}>{item}</Selected>
          </SelectedWrapper>:<NotSelected onClick={()=>{this.changeCategory(item)}}>{item}</NotSelected>
          ))}       
          </CategoryWrapper>
          </div>}
            <AllTitles>
              {titles.map(item=>(
                <TitleWrapper onClick={()=>this.selectMovie(item.id)}>
                  <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="image"/>
                  <Title>{item.title}</Title>
                  <Date>{item.release_date}</Date>
                </TitleWrapper>
              ))}
            </AllTitles>
            </div>}
        </Container>
    )
  }
}

export default App;