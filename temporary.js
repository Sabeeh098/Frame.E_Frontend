<div className="w-full md:flex-grow">
     
{/* Place your main content here */}
{showVisualArts && <VisualArts />}
{showCrafts && <Crafts />}
{showFineArts && <FineArts />}
{showDrawing && <Drawing />}



</div>



const [showVisualArts, setShowVisualArts] = useState(true);
const [showCrafts, setShowCrafts] = useState(false);
const [showFineArts, setShowFineArts] = useState(false);
const [showDrawing, setShowDrawing] = useState(false);

const toggleVisualArts = () => {
  setActiveLink('VisualArts');
  setShowVisualArts(true);
  setShowCrafts(false);
  setShowFineArts(false);
  setShowDrawing(false);
};

const toggleCrafts = () => {
  setActiveLink('Crafts');
  setShowVisualArts(false);
  setShowCrafts(true);
  setShowFineArts(false);
  setShowDrawing(false);
};

const toggleFineArts = () => {
  setActiveLink('FineArts');
  setShowVisualArts(false);
  setShowCrafts(false);
  setShowFineArts(true);
  setShowDrawing(false);
};

const toggleDrawing = () => {
  setActiveLink('Drawing');
  setShowVisualArts(false);
  setShowCrafts(false);
  setShowFineArts(false);
  setShowDrawing(true);
};



fetchChats: async (req, res) => {
  try {
      const { compId, senderRole } = req.query

      if (senderRole === "users" && !compId) {
          return res.status(400).json({ errMsg: 'Bad Request' })
      }

      let companyId = compId;
      let userId;
      // ?
      let senderId;
      let senderIdField

      if (senderRole === 'users') {
          senderId = new mongoose.Types.ObjectId(req.payload.id);
          senderIdField = 'userId'
      }else{
          senderId = new mongoose.Types.ObjectId(req.payload.companyId);
          senderIdField = 'companyId'
      }
      const chats = await Chat
          .find({[senderIdField]: senderId })
          .populate({ path: 'userId', select: 'firstName lastName profile' })
          .populate({ path: 'companyId', select: 'companyName profile' })
          .populate({ path: 'latestMessage', populate: { path: 'senderId', select: 'firstName lastName profile companyName' } })
          .sort({ updatedAt: -1 });
      res.status(200).json({ chatList : chats })

  } catch (error) {
      console.log(error);
      return res.status(500).json({ errMsg: 'Internal Server Error' });
  }
},