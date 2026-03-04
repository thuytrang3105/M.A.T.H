import random

class MathModel:
    @staticmethod
    def generate_division_x(level):
        """
        Sinh câu hỏi tìm x: x : a = b hoặc a : x = b
        """
        if level == "easy":
            # Bảng cửu chương 2-5
            divisor = random.randint(2, 5)
            quotient = random.randint(2, 9)
        else:
            # Nâng cao cho lớp 4
            divisor = random.randint(6, 12)
            quotient = random.randint(5, 15)
            
        x_value = divisor * quotient
        
        return {
            "question": f"x : {divisor} = {quotient}",
            "correct_answer": x_value,
            "options": random.sample([x_value, x_value + 2, x_value - 5, x_value + 10], 4)
        }
    
    @staticmethod
    def get_remainder_question():
        total_fish = random.randint(10,20)
        buckets = random.randint(2,4)
        q = total_fish // buckets
        r = total_fish % buckets
        return {
            "type": "remainder",
            "total": total_fish,
            "buckets": buckets,
            "answer_q": q,
            "answer_r": r,
            "question": f"Có {total_fish} con cá đươc chia vào {buckets} xô,Mỗi xô có bao nhiêu con và dư mấy ?"
        }