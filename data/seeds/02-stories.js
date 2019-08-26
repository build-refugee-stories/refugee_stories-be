
exports.seed = function(knex) {
  return knex('stories').insert([
    {
      title: 'They shot him dead', 
      author: 'Nunahar and Abdul', 
      country: 'Myanmar', 
      story: 'We are farmers, and today we are a family of six. Two years ago in Rakhine, Myanmar, the army started arresting all the men. My son Irshadullah was 20 years old then. We were all hiding in our houses, and could not go anywhere, not even to collect food. One day the army came to our house and started taking my 16-year-old daughter with them; my son came out of hiding to intervene. They shot him dead. We had to flee. It is safe in the camps. We can fast here, and pray. At least the Myanmar army will not come in the night and arrest us. But Myanmar is my homeland, that’s where all my ancestors are buried. You can all go home, but I cannot, we have to stay in a small hut in a camp.',
      year: 2017, 
      imageUrl: 'https://images.unsplash.com/photo-1499101451337-2375b0b466fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 
      approved: false, 
    },
    {
      title: 'Open my eyes',
      author: 'Qusay', 
      country: 'Iraq', 
      story: 'The day of the bombing was Thursday, August 3, 2006. In this open field, anyone can come to watch. So this car - the truck - he came in the middle of the stadium. And then he smile, and then he looked left and right. And then he pushed his hand on the horn. when the explosion happened, I flew into the air. My face came to the ground before my body. And then I stood up to run. And then when the shrapnel hit me, I could not move any more. Like, it was like electricity shook my body. I could not see any more. I just heard people shouting. The explosion that happened, it killed 16 people and 56 injured. My dad looked for me. He said, where is Qusay? He did not recognize me, because no nose, no cheek.', 
      year: '2006', 
      imageUrl: 'https://images.unsplash.com/photo-1503217195339-397eb18024e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 
      approved: false, 
    },
    {
      title: 'Everything changed for me that day', 
      author: 'Sana and Yasmine', 
      country: 'Syria', 
      story: 'We left Syria one week ago. There were so many explosions...so we had to leave Syria. What do I remember of Syria? I remember two things — our house being bombed, and not having any bread. Most of the houses were being hit. We had to stay in one room, all of us. The other rooms were being hit — shooting from the side of the other rooms. The bombs were hitting constantly, I was very scared. I felt so afraid, I knew we could not move from that one room. There were 13 of us in total, crammed into one room. We did not leave that room for two weeks. It was always so loud. My father left the room. I watched my father leave, and watched as my father was shot outside our home. I started to cry, I was so sad. We were living a normal life. We had enough food, now we depend on others. Everything changed for me that day.', 
      year: 2013, 
      imageUrl: 'https://images.unsplash.com/photo-1451471016731-e963a8588be8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80', 
      approved: false, 
    }
  ]);
};
