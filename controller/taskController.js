const Task = require('../model/Task')
const taskController={} // 여러 함수를 가진 객체

taskController.createTask = async (req, res)=>{
	try{
		const {task} = req.body;  //bodyParser가 알아서 읽어 준다. isDone은 안받아와도 된다.
		const userId = req.userId
		const newTask = new Task({task, authorId: userId})
		await newTask.save()
		res.status(200).json({status:'ok', data:newTask})
	} catch(e){
		res.status(400).json({status:'fail', error:e})
	}
} 
taskController.getTasks = async(req, res)=>{
	try{
		const taskList = await Task.find().populate('authorId').populate('replyIds')
		res.status(200).json({status:'ok', data:taskList})
	}catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}
taskController.updateTask = async(req, res)=>{
	try{
		const id = req.params.id;
		// req.body는 유동적이다. 안들어올 수도 있고 들어올 수도 있다.
		const {task} = req.body;

		const foundTask = await Task.findOne({_id: id})
		console.log('찾은 테스크 :', foundTask)
		let updatedTask;

		if(task === undefined){  // req.body가 없는 요청을 하면 isDone을 바꾼다.
			await Task.updateOne(
				{_id: id},
				{ $set: {isDone: !foundTask.isDone}},
			)
			updatedTask = await Task.findOne({_id:id})
		} else if(task !==undefined){ // req.body에 task 값을 전달한 경우 task바꾼다.
			await Task.updateOne(
				{_id: id},
				{ $set: {task: task}},
			)
			updatedTask = await Task.findOne({_id:id})
		}
		res.status(200).json({status:'ok', data: updatedTask})

		// 혹은 다음과 같이 해도 된다.
		// const updatedTask = await Task.findOneAndUpdate(
        //     { _id: id },
        //     task === task ? { $set: { isDone: !isDone } } : { $set: { task: task } },
        //     { new: true } // 업데이트 후의 문서를 반환하도록 설정
		//                      만약 {new:true}를 적지 않으면, 업데이트 이전의 데이터를 반환한다.
        // );
        // res.status(200).json({ status: 'ok', data: updatedTask });
		
	}catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}
taskController.deleteTask = async(req, res)=>{
	try{
		const {id} = req.params;
		await Task.deleteOne({_id: id})
		//혹은  await Task.findByIdAndDelete({ _id: id });

		res.status(200).json({status:'ok', message: 'Task deleted successfully'})
	}catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}

module.exports = taskController