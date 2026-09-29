import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'

export default function MoviecCard({ movie, layout, onSelect }: {movie: any, layout: string, onSelect: Function}){
  const isTitle = layout === 'title';

  return(
    <TouchableOpacity onPress = {() => onSelect(movie.id)}
    style = {[styles.card, isTitle && styles.cardTitle]}
    >
      <View style = {isTitle ? styles.posterTitle: styles.posterRow}>
        <Image source = {{uri: movie.poster}} style = {styles.img}/>
        {isTitle && (
          <View style ={styles.ratingBadge}>
            <Text style={styles.badgeText}>{movie.rating}</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={isTitle ? 1 : undefined}>
          {movie.title}
        </Text>

        {!isTitle && <Text style={styles.text}>{movie.genre} - {movie.year}</Text>}
        {!isTitle && <Text style={styles.text}>⭐ {movie.rating}</Text>}

        <Text style={styles.text}>
          {movie.isShowing ? '✅Đang chiếu' : '❌Ngừng chiếu'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card:{
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2
  },
  cardTitle:{
    flexDirection: 'column',
    flex: 1
  },
  posterRow:{
    width: 70,
    height: 100
  },
  posterTitle:{
    width: '100%',
    height: 200,
    aspectRatio: 2/3
  },
  img:{
    width: '100%',
    height: '100%'
  },
  ratingBadge:{
    position: 'absolute',
    top: 5, 
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 3,
    borderRadius: 4
  },
  badgeText:{fontSize: 12},
  info:{ flex:1, padding: 10, justifyContent: 'center'},
  title:{fontWeight: 'bold', fontSize: 16, marginBottom: 5},
  text: {fontSize: 13, marginBottom: 2}

})