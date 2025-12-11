
export type ContactType = {
  name: string
  avatar?: string
  message: string
  timestamp: string
  unreadMessages?: number
  image?: string
}

type Sender = {
  avatar: string
}

export type Message = {
  sender: Sender
  content: any
  timestamp: string
  isSentByCurrentUser: boolean
}

export type MessageType = {
  date: string
  messages: Message[]
  id?: number
}

export const contactsData: ContactType[] = [
  {
    name: 'Mikaela Collins',
    image: 'assets/img/avatar/06.jpg',
    message: 'Thank you for ...',
    timestamp: '15:01',
    unreadMessages: 2,
  },
  {
    name: 'Robert Fox',
    image: 'assets/img/avatar/08.jpg',
    message: 'Documents have ...',
    timestamp: '13:10',
    unreadMessages: 3,
  },
  {
    name: 'Furry Aocklen',
    avatar: 'FA',
    message: 'I got it, thanks 👍',
    timestamp: '12:04',
  },
  {
    name: 'Mark Virgows',
    image: 'assets/img/avatar/19.jpg',
    message: 'Ac aliquam victoria ...',
    timestamp: '11:36',
  },
  {
    name: 'Nadia Davidson',
    avatar: 'ND',
    message: 'Nullam id devices ...',
    timestamp: '20 hr',
  },
  {
    name: 'Alica Hawkins',
    image: 'assets/img/avatar/09.jpg',
    message: 'Massa laoreet molit ...',
    timestamp: '23 hr',
  },
  {
    name: 'Natalia Bocous',
    image: 'assets/img/avatar/05.jpg',
    message: 'Awesome 🚀',
    timestamp: '2 days',
  },
  {
    name: 'Marry Black',
    image: 'assets/img/avatar/20.jpg',
    message: 'I have great news!',
    timestamp: '3 days',
  },
  {
    name: 'Jerome Bell',
    image: 'assets/img/avatar/10.jpg',
    message: 'Ok 👌',
    timestamp: 'May 21',
  },
  {
    name: 'Jerome Bell',
    image: 'assets/img/avatar/11.jpg',
    message: 'Do you know how ...',
    timestamp: '2 days',
  },
]

export const messagesData: MessageType[] = [
  {
    id: 1,
    date: 'May 27,',
    messages: [
      {
        sender: {
          avatar: 'assets/img/avatar/19.jpg',
        },
        content:
          'Thank you for recommending me as a designer. I have an interview tomorrow!',
        timestamp: '11:32 am',
        isSentByCurrentUser: false,
      },
      {
        sender: {
          avatar: 'assets/img/avatar/01.jpg',
        },
        content: 'Oh no thanks! I just know that you are a great specialist!',
        timestamp: '2:18 pm',
        isSentByCurrentUser: true,
      },
    ],
  },
  {
    id: 2,
    date: 'May 29,',
    messages: [
      {
        sender: {
          avatar: 'assets/img/avatar/19.jpg',
        },
        content: "I have great news, I've been hired! 🚀\nThanks again!",
        timestamp: '4:04 am',
        isSentByCurrentUser: false,
      },
      {
        sender: {
          avatar: 'assets/img/avatar/01.jpg',
        },
        content: 'You are welcome!',
        timestamp: '2:18 pm',
        isSentByCurrentUser: true,
      },
    ],
  },
  {
    id: 3,
    date: 'Today',
    messages: [
      {
        sender: {
          avatar: 'assets/img/avatar/19.jpg',
        },
        content:
          "I'm so happy to be part of the team and work with you on this new exciting project. Can't thank you enough 😊",
        timestamp: '10:17 am',
        isSentByCurrentUser: false,
      },
    ],
  },
]
